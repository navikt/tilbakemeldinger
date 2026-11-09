import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import nb from '#shared/language/nb.ts';
import { API, BASE, CDN_BASE, parseHtml, postJson, startServer, type TestServer } from './harness';
import { NOT_FOUND_HTML } from './stub';
import { expectNoUnexpectedHosts } from './fixtures';

describe('routing edge cases', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('a path outside the base path gets the nav.no 404 page', async () => {
		const res = await server.fetch('/finnes-ikke');

		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toBe('text/html; charset=UTF-8');
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('a path under the base path outside the pages gets the nav.no 404 page', async () => {
		const res = await server.fetch(`${BASE}/finnes-ikke`);

		expect(res.status).toBe(404);
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('an unknown GET under the API gets the nav.no 404 page', async () => {
		const res = await server.fetch(`${API}/finnes-ikke`);

		expect(res.status).toBe(404);
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('an unknown page renders the not found page, with status 200', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/finnes-ikke`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('text/html; charset=UTF-8');

		const doc = parseHtml(await res.text());
		expect(doc.querySelector('#maincontent h2')?.textContent).toBe(nb['feil.404']);
		expect(doc.head.querySelector('title')?.textContent).toBe(`${nb['feil.404']} - www.nav.no`);
		expect(doc.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
		expect(doc.head.querySelector('meta[name="description"]')).toBeNull();
		expect(doc.head.querySelector('link[rel="canonical"]')).toBeNull();
	});

	test('a POST to a page gets the 404 page with CSP, also when the page is cached', async () => {
		const url = `${BASE}/nb/tilbakemeldinger/serviceklage?post=cached`;
		expect((await server.fetch(url)).status).toBe(200);

		const res = await server.fetch(url, { method: 'POST' });

		expect(res.status).toBe(404);
		expect(res.headers.get('content-security-policy')).toBeTruthy();
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test.each([
		['malformed JSON', '{"hvemRoses": '],
		['JSON over 100kb', JSON.stringify({ melding: 'x'.repeat(110_000) })],
	])('%s to mottak gets the 404 page without CSP', async (_, body) => {
		const res = await postJson(server, `${API}/mottak/ros`, body);

		expect(res.status).toBe(404);
		expect(res.headers.get('content-security-policy')).toBeNull();
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('pages load their script and stylesheet from the CDN, not from the server', async () => {
		const page = await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage?assets=1`);
		const doc = parseHtml(await page.text());

		const script = doc.querySelector('script[type="module"]')?.getAttribute('src');
		const stylesheet = doc.querySelector('link[rel="stylesheet"]')?.getAttribute('href');
		expect(script).toMatch(new RegExp(`^${CDN_BASE}/assets/.+\\.js$`));
		expect(stylesheet).toMatch(new RegExp(`^${CDN_BASE}/assets/.+\\.css$`));

		// Where the server used to serve it
		expect((await server.fetch(`${BASE}${script!.slice(CDN_BASE.length)}`)).status).toBe(404);
	});

	// Framework-specific behavior, pinned so a framework change shows up as a test diff
	test('does not answer OPTIONS', async () => {
		const res = await server.fetch(`${API}/internal/isAlive`, { method: 'OPTIONS' });

		expect(res.status).toBe(404);
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('matches routes case-sensitively', async () => {
		const res = await server.fetch(`${API}/internal/ISALIVE`);

		// Not the probe
		expect(res.status).toBe(404);
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});
});
