/*
 * Loaded with `node --import` into the server process under test. Every fetch
 * to a non-loopback host is sent to the test stub instead (STUB_ORIGIN), with
 * the original host in the x-stub-host header, so the server never reaches the
 * real network and the test can see what it sent. No imports: Node runs this
 * file directly with type stripping.
 */

const realFetch: typeof fetch = globalThis.fetch;
const stubOrigin = process.env.STUB_ORIGIN;
const loopback = new Set(['localhost', '127.0.0.1', '[::1]']);

if (!stubOrigin) {
	throw new Error('STUB_ORIGIN must be set');
}

globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
	const req = new Request(input, init);
	const url = new URL(req.url);

	if (loopback.has(url.hostname)) {
		return realFetch(req);
	}

	const headers = new Headers(req.headers);
	headers.set('x-stub-host', url.host);
	const body = req.body ? await req.arrayBuffer() : undefined;

	return realFetch(new URL(url.pathname + url.search, stubOrigin), {
		method: req.method,
		headers,
		body,
		redirect: req.redirect,
		signal: req.signal,
	});
};
