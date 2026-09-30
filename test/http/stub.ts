import http from 'node:http';
import type { AddressInfo } from 'node:net';

/*
 * Stand-in for every service outside the app (decorator, nav.no, Azure AD,
 * TokenX, norg2, tilbakemeldingsmottak-api). The server's outbound fetches are
 * rerouted here by preload.ts, with the original host in the Host header.
 */

export type StubRequest = {
	host: string;
	method: string;
	path: string;
	query: URLSearchParams;
	headers: http.IncomingHttpHeaders;
	body: string;
};

export type StubReply = { status?: number; headers?: Record<string, string>; body?: unknown } | 'destroy';

export type StubRoute = {
	host: string;
	path: string | RegExp;
	method?: string;
	reply: (req: StubRequest) => StubReply;
};

export type Stub = {
	origin: string;
	requests: StubRequest[];
	unexpected: StubRequest[];
	// Routes added later take precedence over the defaults
	route: (route: StubRoute) => void;
	find: (host: string, path?: string | RegExp) => StubRequest[];
	close: () => Promise<void>;
};

export const DECORATOR_MARKERS = {
	headAssets: '<link rel="stylesheet" href="https://stub.test/decorator.css" data-stub="head-assets" />',
	header: '<div data-stub="decorator-header"></div>',
	footer: '<div data-stub="decorator-footer"></div>',
	scripts: '<script src="https://stub.test/decorator.js" data-stub="decorator-scripts"></script>',
};

export const NOT_FOUND_HTML = '<html><body><h1 data-stub="nav-404">Fant ikke siden</h1></body></html>';

export const CSP_DIRECTIVES = { 'script-src': ['https://stub.test'] };

export const ENHETER = [
	{ enhetNr: '0314', navn: 'Nav Sagene', type: 'LOKAL', status: 'Aktiv', enhetId: 1, orgNivaa: 'EN' },
	{ enhetNr: '4150', navn: 'Nav Kontaktsenter', type: 'KO', status: 'Aktiv', enhetId: 2, orgNivaa: 'EN' },
];

const json = (body: unknown, status = 200): StubReply => ({
	status,
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify(body),
});

const defaultRoutes: StubRoute[] = [
	{ host: 'dekoratoren.ekstern.dev.nav.no', path: '/api/csp', reply: () => json(CSP_DIRECTIVES) },
	{ host: 'www.nav.no', path: '/dekoratoren/api/csp', reply: () => json(CSP_DIRECTIVES) },
	{ host: 'www.nav.no', path: '/dekoratoren/api/version', reply: () => json({ latestVersion: '1' }) },
	{ host: 'www.nav.no', path: '/dekoratoren/ssr', reply: () => json({ ...DECORATOR_MARKERS, versionId: '1' }) },
	{
		host: 'www.nav.no',
		path: '/404',
		reply: () => ({ status: 404, headers: { 'content-type': 'text/html' }, body: NOT_FOUND_HTML }),
	},
	{
		host: 'login.microsoftonline.com',
		path: /\/oauth2\/v2\.0\/token$/,
		method: 'POST',
		reply: () => json({ access_token: 'azure-token', token_type: 'Bearer', expires_in: 3600 }),
	},
	{
		host: 'tokenx.test',
		path: '/.well-known/oauth-authorization-server',
		reply: () => json({ issuer: 'https://tokenx.test', token_endpoint: 'https://tokenx.test/token' }),
	},
	{
		host: 'tokenx.test',
		path: '/token',
		method: 'POST',
		reply: () => json({ access_token: 'tokenx-token', token_type: 'Bearer', expires_in: 300 }),
	},
	{ host: 'norg2.test', path: '/norg2/api/v1/enhet', reply: () => json(ENHETER) },
	{ host: 'tilbakemeldingsmottak-api.test', path: /^\/rest\//, method: 'POST', reply: () => json({}) },
];

const matches = (route: StubRoute, req: StubRequest) =>
	route.host === req.host &&
	(!route.method || route.method === req.method) &&
	(typeof route.path === 'string' ? route.path === req.path : route.path.test(req.path));

export const startStub = async (extraRoutes: StubRoute[] = []): Promise<Stub> => {
	const routes = [...extraRoutes, ...defaultRoutes];
	const requests: StubRequest[] = [];
	const unexpected: StubRequest[] = [];

	const server = http.createServer(async (incoming, res) => {
		const chunks: Buffer[] = [];
		for await (const chunk of incoming) {
			chunks.push(chunk as Buffer);
		}

		const url = new URL(incoming.url ?? '/', 'http://stub');
		const req: StubRequest = {
			host: incoming.headers.host ?? '',
			method: incoming.method ?? 'GET',
			path: url.pathname,
			query: url.searchParams,
			headers: incoming.headers,
			body: Buffer.concat(chunks).toString('utf-8'),
		};
		requests.push(req);

		const route = routes.find((r) => matches(r, req));
		if (!route) {
			unexpected.push(req);
			res.writeHead(502, { 'content-type': 'text/plain' }).end(`No stub for ${req.method} ${req.host}${req.path}`);
			return;
		}

		const reply = route.reply(req);
		if (reply === 'destroy') {
			res.socket?.destroy();
			return;
		}

		const { status = 200, headers = {}, body } = reply;
		res
			.writeHead(status, headers)
			.end(typeof body === 'string' ? body : body === undefined ? '' : JSON.stringify(body));
	});
	server.keepAliveTimeout = 60_000;

	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
	const { port } = server.address() as AddressInfo;

	return {
		origin: `http://127.0.0.1:${port}`,
		requests,
		unexpected,
		route: (route) => routes.unshift(route),
		find: (host, path) =>
			requests.filter(
				(r) =>
					r.host === host && (path === undefined || (typeof path === 'string' ? r.path === path : path.test(r.path)))
			),
		close: () =>
			new Promise<void>((resolve) => {
				server.closeAllConnections();
				server.close(() => resolve());
			}),
	};
};
