import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, BASE, parseHtml, postJson, startServer, type TestServer } from './harness';
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
		expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
		expect(await res.text()).toBe(NOT_FOUND_HTML);
	});

	test('an unknown GET under the API falls through to a rendered page', async () => {
		const res = await server.fetch(`${API}/finnes-ikke`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
	});

	test('an unknown page is rendered with status 200', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/finnes-ikke`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
	});

	test('a POST to a page that has not been rendered yet gets the 404 page with CSP', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage?post=uncached`, { method: 'POST' });

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

	test('serves the built assets with a one year max-age', async () => {
		const page = await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage?assets=1`);
		const src = parseHtml(await page.text())
			.querySelector('script[type="module"]')
			?.getAttribute('src');
		expect(src).toMatch(new RegExp(`^${BASE}/assets/.+\\.js$`));

		const res = await server.fetch(src!);
		expect(res.status).toBe(200);
		expect(res.headers.get('cache-control')).toBe('public, max-age=31536000');
	});

	// Express-specific behavior, pinned so a framework change shows up as a test diff
	test('answers OPTIONS automatically', async () => {
		const res = await server.fetch(`${API}/internal/isAlive`, { method: 'OPTIONS' });

		expect(res.status).toBe(200);
		expect(res.headers.get('allow')).toBe('GET, HEAD');
	});

	test('matches routes case-insensitively', async () => {
		const res = await server.fetch(`${API}/internal/ISALIVE`);

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ message: 'I am alive!' });
	});
});
