import { generateKeyPairSync } from 'node:crypto';
import type { IncomingMessage } from 'node:http';
import { JSDOM } from 'jsdom';
import type { ViteDevServer } from 'vite';
import { vi } from 'vitest';
import type { AppEnv } from '#server/types.ts';
import { createStub, type Stub, type StubRoute } from './stub';

export const BASE = '/person/kontakt-oss';
export const API = `${BASE}/tilbakemeldinger/api`;

// The client's build-time origin, pinned in vite.config.ts (test.env)
export const APP_ORIGIN = import.meta.env.VITE_APP_ORIGIN;

const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const tokenxJwk = { ...privateKey.export({ format: 'jwk' }), kid: 'test-kid', alg: 'RS256' };

const defaultEnv = (): Record<string, string | undefined> => ({
	ENV: 'dev',
	// Pages render the way they do under `pnpm dev` (server/site/page.ts), with Vitest loading the app in place of
	// Vite (see `vite` below). Rendering the production way needs a build. Nothing else depends on NODE_ENV
	NODE_ENV: 'development',
	APP_PORT: '9001',
	VITE_APP_BASEPATH: BASE,
	API_URL: 'http://tilbakemeldingsmottak-api.test',
	NORG2_ORIGIN: 'http://norg2.test',
	AZURE_APP_TENANT_ID: 'test-tenant',
	AZURE_APP_CLIENT_ID: 'test-client',
	AZURE_APP_CLIENT_SECRET: 'test-secret',
	TOKEN_X_WELL_KNOWN_URL: 'https://tokenx.test/.well-known/oauth-authorization-server',
	TOKEN_X_CLIENT_ID: 'dev-gcp:navno:tilbakemeldinger',
	TOKEN_X_PRIVATE_JWK: JSON.stringify(tokenxJwk),
	// Unset, whatever the shell or a local .env says
	VITE_EDITORIAL_FRONTPAGE_ORIGIN: undefined,
	MOCK_ACCESS_TOKEN: undefined,
	NAIS_CLUSTER_NAME: undefined,
});

// Stands in for the Vite dev server, which the page renderer loads client/main-server.tsx through
const vite = {
	ssrLoadModule: () => import('#client/main-server.tsx'),
	ssrFixStacktrace: () => {},
} as unknown as ViteDevServer;

export type TestServer = {
	stub: Stub;
	fetch: (path: string, init?: RequestInit) => Promise<Response>;
	stop: () => Promise<void>;
};

type Options = {
	// Merged over the defaults; undefined removes a variable
	env?: Record<string, string | undefined>;
	// Stub routes that must be in place before startup (CSP, 404 page, TokenX config)
	routes?: StubRoute[];
};

// The server (server/app.ts) in this process, with its outbound requests going to the stub
export const startServer = async (options: Options = {}): Promise<TestServer> => {
	const stub = createStub(options.routes);
	vi.stubGlobal('fetch', stub.fetch);
	vi.unstubAllEnvs();
	for (const [name, value] of Object.entries({ ...defaultEnv(), ...options.env })) {
		vi.stubEnv(name, value);
	}

	// A fresh copy of the server's modules, which read the env above, and start with empty caches and rate limits
	vi.resetModules();
	const { default: app } = await import('#server/app.ts');

	return {
		stub,
		fetch: async (path, init) => {
			const request = new Request(new URL(path, 'http://localhost'), init);
			// What @hono/node-server hands the app, as far as it reads it: the socket is the ingress and sidecar in
			// front of the app, and X-Forwarded-For says who the client is (server/api/rate-limit.ts)
			const incoming = { headers: Object.fromEntries(request.headers), socket: { remoteAddress: '127.0.0.1' } };
			const bindings: AppEnv['Bindings'] = {
				incoming: incoming as unknown as IncomingMessage,
				outgoing: undefined as never,
				vite,
			};
			return app.request(request, undefined, bindings);
		},
		stop: async () => {
			// Timers in the decorator library outlive the server, and must not reach the network
			vi.stubGlobal('fetch', () => Promise.reject(new TypeError('fetch failed: the test server is stopped')));
			vi.unstubAllEnvs();
		},
	};
};

export const parseHtml = (html: string) => new JSDOM(html).window.document;

export const postJson = (server: TestServer, path: string, body: unknown, headers: Record<string, string> = {}) =>
	server.fetch(path, {
		method: 'POST',
		headers: { 'content-type': 'application/json', ...headers },
		body: typeof body === 'string' ? body : JSON.stringify(body),
	});
