import { spawn } from 'node:child_process';
import { generateKeyPairSync } from 'node:crypto';
import net from 'node:net';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import { startStub, type Stub, type StubRoute } from './stub';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));

// How the built server is started. This is the only line that should change
// when the server is ported or moved; the tests must stay the same.
export const ENTRY = ['server/dist/server/server/src/server.js'];

export const BASE = '/person/kontakt-oss';
export const API = `${BASE}/tilbakemeldinger/api`;

// Baked into the client/SSR bundles by `pretest:http` in package.json
export const APP_ORIGIN = 'https://www.nav.test';

const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const tokenxJwk = { ...privateKey.export({ format: 'jwk' }), kid: 'test-kid', alg: 'RS256' };

const defaultEnv = (): Record<string, string> => ({
	ENV: 'dev',
	NODE_ENV: 'production',
	VITE_APP_BASEPATH: BASE,
	API_URL: 'http://tilbakemeldingsmottak-api.test',
	NORG2_ORIGIN: 'http://norg2.test',
	AZURE_APP_TENANT_ID: 'test-tenant',
	AZURE_APP_CLIENT_ID: 'test-client',
	AZURE_APP_CLIENT_SECRET: 'test-secret',
	TOKEN_X_WELL_KNOWN_URL: 'https://tokenx.test/.well-known/oauth-authorization-server',
	TOKEN_X_CLIENT_ID: 'dev-gcp:navno:tilbakemeldinger',
	TOKEN_X_PRIVATE_JWK: JSON.stringify(tokenxJwk),
});

export type TestServer = {
	baseUrl: string;
	stub: Stub;
	fetch: (path: string, init?: RequestInit) => Promise<Response>;
	output: () => string;
	stop: () => Promise<void>;
};

type Options = {
	// Merged over the defaults; undefined removes a variable
	env?: Record<string, string | undefined>;
	// Stub routes that must be in place before startup (CSP, 404 page, TokenX config)
	routes?: StubRoute[];
};

const freePort = () =>
	new Promise<number>((resolve, reject) => {
		const srv = net.createServer();
		srv.once('error', reject);
		srv.listen(0, '127.0.0.1', () => {
			const { port } = srv.address() as net.AddressInfo;
			srv.close(() => resolve(port));
		});
	});

const launch = async (stub: Stub, options: Options, attempt: number): Promise<TestServer> => {
	const port = await freePort();
	const env: Record<string, string> = {};
	const merged = {
		...defaultEnv(),
		...options.env,
		PATH: process.env.PATH,
		APP_PORT: String(port),
		STUB_ORIGIN: stub.origin,
	};
	for (const [key, value] of Object.entries(merged)) {
		if (value !== undefined) {
			env[key] = value;
		}
	}

	const preload = pathToFileURL(fileURLToPath(new URL('./preload.ts', import.meta.url))).href;
	const child = spawn(process.execPath, ['--import', preload, ...ENTRY], {
		cwd: ROOT,
		env,
		stdio: ['ignore', 'pipe', 'pipe'],
	});

	let output = '';
	child.stdout.on('data', (data) => (output += data));
	child.stderr.on('data', (data) => (output += data));

	let exited = false;
	const exitPromise = new Promise<void>((resolve) =>
		child.once('exit', () => {
			exited = true;
			resolve();
		})
	);

	const baseUrl = `http://127.0.0.1:${port}`;
	const deadline = Date.now() + 20_000;
	while (!exited) {
		const ready = await fetch(`${baseUrl}${API}/internal/isReady`)
			.then((res) => res.ok)
			.catch(() => false);
		if (ready) {
			break;
		}
		if (Date.now() > deadline) {
			child.kill('SIGKILL');
			throw new Error(`Server did not become ready within 20s:\n${output}`);
		}
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	if (exited) {
		if (output.includes('EADDRINUSE') && attempt < 3) {
			return launch(stub, options, attempt + 1);
		}
		throw new Error(`Server exited during startup:\n${output}`);
	}

	const stop = async () => {
		if (!exited) {
			child.kill('SIGTERM');
			const timer = setTimeout(() => child.kill('SIGKILL'), 5_000);
			await exitPromise;
			clearTimeout(timer);
		}
		await stub.close();
	};

	return {
		baseUrl,
		stub,
		fetch: (path, init) => fetch(`${baseUrl}${path}`, { redirect: 'manual', ...init }),
		output: () => output,
		stop,
	};
};

export const startServer = async (options: Options = {}): Promise<TestServer> => {
	const stub = await startStub(options.routes);
	try {
		return await launch(stub, options, 1);
	} catch (e) {
		await stub.close();
		throw e;
	}
};

export const parseHtml = (html: string) => new JSDOM(html).window.document;

export const postJson = (server: TestServer, path: string, body: unknown, headers: Record<string, string> = {}) =>
	server.fetch(path, {
		method: 'POST',
		headers: { 'content-type': 'application/json', ...headers },
		body: typeof body === 'string' ? body : JSON.stringify(body),
	});
