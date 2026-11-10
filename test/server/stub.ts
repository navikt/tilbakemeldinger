/*
 * Stand-in for every service outside the app (decorator, nav.no, Azure AD,
 * TokenX, norg2, tilbakemeldingsmottak-api). It replaces the global fetch that
 * the server, and the libraries it uses, call (see server.ts).
 */

export type StubRequest = {
	host: string;
	method: string;
	path: string;
	query: URLSearchParams;
	headers: Record<string, string>;
	body: string;
};

// 'destroy' fails the request the way a broken connection does
export type StubReply = { status?: number; headers?: Record<string, string>; body?: unknown } | 'destroy';

export type StubRoute = {
	host: string;
	path: string | RegExp;
	method?: string;
	reply: (req: StubRequest) => StubReply;
};

export type Stub = {
	fetch: typeof fetch;
	requests: StubRequest[];
	unexpected: StubRequest[];
	// Routes added later take precedence over the defaults
	route: (route: StubRoute) => void;
	find: (host: string, path?: string | RegExp) => StubRequest[];
};

export const DECORATOR_MARKERS = {
	headAssets: '<link rel="stylesheet" href="https://stub.test/decorator.css" data-stub="head-assets" />',
	header: '<div data-stub="decorator-header"></div>',
	footer: '<div data-stub="decorator-footer"></div>',
	scripts: '<script src="https://stub.test/decorator.js" data-stub="decorator-scripts"></script>',
};

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

const pathMatches = (pattern: string | RegExp, path: string) =>
	typeof pattern === 'string' ? pattern === path : pattern.test(path);

const toBody = (body: unknown): string | null => {
	if (typeof body === 'string') {
		return body;
	}
	if (body === undefined) {
		return null;
	}
	return JSON.stringify(body);
};

const matches = (route: StubRoute, req: StubRequest) =>
	route.host === req.host && (!route.method || route.method === req.method) && pathMatches(route.path, req.path);

export const createStub = (extraRoutes: StubRoute[] = []): Stub => {
	const routes = [...extraRoutes, ...defaultRoutes];
	const requests: StubRequest[] = [];
	const unexpected: StubRequest[] = [];

	const stubFetch = async (input: string | URL | Request, init?: RequestInit) => {
		const request = new Request(input, init);
		const url = new URL(request.url);
		const req: StubRequest = {
			host: url.host,
			method: request.method,
			path: url.pathname,
			query: url.searchParams,
			headers: Object.fromEntries(request.headers),
			body: await request.text(),
		};
		requests.push(req);

		const route = routes.find((r) => matches(r, req));
		if (!route) {
			unexpected.push(req);
			return new Response(`No stub for ${req.method} ${req.host}${req.path}`, { status: 502 });
		}

		const reply = route.reply(req);
		if (reply === 'destroy') {
			throw new TypeError('fetch failed');
		}

		const { status = 200, headers = {}, body } = reply;
		return new Response(toBody(body), { status, headers });
	};

	return {
		fetch: stubFetch,
		requests,
		unexpected,
		route: (route) => routes.unshift(route),
		find: (host, path) =>
			requests.filter((r) => r.host === host && (path === undefined || pathMatches(path, r.path))),
	};
};
