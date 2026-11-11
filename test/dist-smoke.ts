// Runs the build the way the image does, from dist/ and package.json with no node_modules, and requests the pages,
// the API and the probes. Catches a dependency that only breaks once it's bundled, which the unit tests, running
// from source, can't see. `pnpm run build:local && pnpm test:dist`; CI runs it after the build

// node:test's test() returns a promise the runner tracks itself
/* oxlint-disable typescript/no-floating-promises */
import assert from 'node:assert/strict';
import { type ChildProcess, spawn } from 'node:child_process';
import { generateKeyPairSync } from 'node:crypto';
import { once } from 'node:events';
import { cp, mkdtemp, readFile, rm } from 'node:fs/promises';
import { createServer, type Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import nb from '#shared/language/nb.ts';

const STARTUP_TIMEOUT = 30_000;
const BASE = '/person/kontakt-oss';

const ENHETER = [
	{ enhetNr: '0314', navn: 'Nav Sagene', type: 'LOKAL', status: 'Aktiv', enhetId: 1, orgNivaa: 'EN' },
	{ enhetNr: '4150', navn: 'Nav Kontaktsenter', type: 'KO', status: 'Aktiv', enhetId: 2, orgNivaa: 'EN' },
];

let dir: string;
let upstream: Server;
let app: ChildProcess;
let output = '';
let origin: string;

const listen = async (server: Server) => {
	server.listen(0, '127.0.0.1');
	await once(server, 'listening');
	return (server.address() as AddressInfo).port;
};

// A port nothing is listening on, for the app
const freePort = async () => {
	const server = createServer();
	const port = await listen(server);
	server.close();
	return port;
};

const waitForListening = (child: ChildProcess) =>
	new Promise<void>((resolve, reject) => {
		const timer = setTimeout(
			() => reject(new Error(`No "Server listening" within ${STARTUP_TIMEOUT} ms`)),
			STARTUP_TIMEOUT
		);
		child.stdout?.on('data', () => {
			if (output.includes('Server listening')) {
				clearTimeout(timer);
				resolve();
			}
		});
		child.on('exit', (code) => {
			clearTimeout(timer);
			reject(new Error(`The server exited with ${code}`));
		});
	});

const get = (path: string) =>
	// The page waits for the decorator, which outside a cluster comes from www.nav.no
	fetch(`${origin}${path}`, { signal: AbortSignal.timeout(30_000) });

// The server's output, so a failure shows what it logged
const withOutput = (message: string) => `${message}\n--- server output ---\n${output}`;

before(async () => {
	// norg2, answering with the offices
	upstream = createServer((_, res) => {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(ENHETER));
	});
	const upstreamOrigin = `http://127.0.0.1:${await listen(upstream)}`;

	// What the image has: package.json, for the #dist/* imports, the server build and the client build's manifest
	dir = await mkdtemp(join(tmpdir(), 'tilbakemeldinger-'));
	await cp('dist/server', join(dir, 'dist/server'), { recursive: true });
	await cp('dist/client/.vite', join(dir, 'dist/client/.vite'), { recursive: true });
	await cp('package.json', join(dir, 'package.json'));

	const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
	const port = await freePort();
	origin = `http://127.0.0.1:${port}`;
	app = spawn(process.execPath, ['dist/server/main.js'], {
		cwd: dir,
		// What NAIS gives the pod in dev, with norg2 and tilbakemeldingsmottak-api here
		env: {
			PATH: process.env.PATH,
			NODE_ENV: 'production',
			ENV: 'dev',
			APP_PORT: String(port),
			APP_ORIGIN: 'https://www.nav.test',
			AUTH_URL: 'https://www.nav.test/person/nav-dekoratoren-api/auth',
			LOGIN_URL: 'https://login.nav.test/oauth2/login',
			TELEMETRY_URL: 'https://telemetry.test/collect',
			NORG2_ORIGIN: upstreamOrigin,
			API_URL: upstreamOrigin,
			API_TOKENX_AUDIENCE: 'dev-gcp:teamserviceklage:tilbakemeldingsmottak-api',
			API_AZURE_SCOPE: 'api://dev-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default',
			AZURE_APP_TENANT_ID: 'test-tenant',
			AZURE_APP_CLIENT_ID: 'test-client',
			AZURE_APP_CLIENT_SECRET: 'test-secret',
			TOKEN_X_WELL_KNOWN_URL: `${upstreamOrigin}/.well-known/oauth-authorization-server`,
			TOKEN_X_CLIENT_ID: 'dev-gcp:navno:tilbakemeldinger',
			TOKEN_X_PRIVATE_JWK: JSON.stringify({ ...privateKey.export({ format: 'jwk' }), kid: 'test', alg: 'RS256' }),
		},
	});
	const collect = (chunk: Buffer) => {
		output += chunk.toString();
	};
	app.stdout?.on('data', collect);
	app.stderr?.on('data', collect);
	await waitForListening(app).catch((e: unknown) => {
		throw new Error(withOutput(String(e)));
	});
});

after(async () => {
	if (app?.exitCode === null) {
		app.kill('SIGTERM');
		await once(app, 'exit');
	}
	upstream?.close();
	if (dir) {
		await rm(dir, { recursive: true, force: true });
	}
});

for (const path of [`${BASE}/tilbakemeldinger/api/internal/isAlive`, `${BASE}/tilbakemeldinger/api/internal/isReady`]) {
	test(`${path} answers`, async () => {
		const res = await get(path);
		assert.equal(res.status, 200, withOutput(`${path}: ${res.status}`));
	});
}

test('the metrics answer', async () => {
	const res = await get('/internal/metrics');
	assert.equal(res.status, 200, withOutput(`/internal/metrics: ${res.status}`));
	assert.match(await res.text(), /tilbakemeldinger_submissions_total/);
});

test('a page renders the app, with the client build’s script', async () => {
	const manifest: Record<string, { file: string }> = JSON.parse(
		await readFile(join(dir, 'dist/client/.vite/manifest.json'), 'utf-8')
	);
	const script = manifest['client/main-client.tsx']?.file;
	assert.ok(script, 'client/main-client.tsx is missing from the manifest');

	const res = await get(`${BASE}/nb/tilbakemeldinger/serviceklage`);
	const html = await res.text();
	assert.equal(res.status, 200, withOutput(`serviceklage: ${res.status}`));
	assert.ok(
		html.includes(`<title>${nb['tilbakemeldinger.serviceklage.sidetittel']} - www.nav.no</title>`),
		withOutput(html)
	);
	assert.match(html, /<main[^>]*class="tilbakemeldingerApp"[^>]*><\w/, withOutput('The page is missing the app'));
	assert.ok(html.includes(script), withOutput(`The page is missing ${script}`));
	// Where the app runs, from the environment above and not from the build
	assert.match(
		html,
		/id="app-config"[^>]*>[^<]*"origin":"https:\/\/www\.nav\.test"/,
		withOutput('The page is missing its config')
	);
});

test('an unknown page gets the 404 page', async () => {
	const res = await get(`${BASE}/nb/tilbakemeldinger/finnes-ikke`);
	assert.equal(res.status, 404, withOutput(`finnes-ikke: ${res.status}`));
	assert.ok((await res.text()).includes(nb['feil.404']));
});

test('the offices come from norg2', async () => {
	const res = await get(`${BASE}/tilbakemeldinger/api/enheter`);
	assert.equal(res.status, 200, withOutput(`/enheter: ${res.status}`));
	assert.deepEqual(
		(await res.json()).map((enhet: { enhetNr: string }) => enhet.enhetNr),
		ENHETER.map((enhet) => enhet.enhetNr)
	);
});
