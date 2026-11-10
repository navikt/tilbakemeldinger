import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import nb from '#shared/language/nb.ts';
import { API, BASE, parseHtml, postJson, startServer, type TestServer } from './server';
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

	test.each([
		['outside the base path', '/finnes-ikke'],
		['under the base path, outside the pages', `${BASE}/finnes-ikke`],
		['under the API', `${API}/finnes-ikke`],
	])('an unknown path %s gets a plain 404', async (_, path) => {
		const res = await server.fetch(path);

		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toBe('text/plain; charset=UTF-8');
		expect(await res.text()).toBe('404 Not Found');
	});

	test('an unknown page renders the not found page, with status 404', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/finnes-ikke`);

		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toBe('text/html; charset=UTF-8');

		const doc = parseHtml(await res.text());
		expect(doc.querySelector('#maincontent h2')?.textContent).toBe(nb['feil.404']);
		expect(doc.head.querySelector('title')?.textContent).toBe(`${nb['feil.404']} - www.nav.no`);
		expect(doc.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
		expect(doc.head.querySelector('meta[name="description"]')).toBeNull();
		expect(doc.head.querySelector('link[rel="canonical"]')).toBeNull();
	});

	test('a POST to a page gets a plain 404 with CSP, also when the page is cached', async () => {
		const url = `${BASE}/nb/tilbakemeldinger/serviceklage?post=cached`;
		expect((await server.fetch(url)).status).toBe(200);

		const res = await server.fetch(url, { method: 'POST' });

		expect(res.status).toBe(404);
		expect(res.headers.get('content-security-policy')).toBeTruthy();
		expect(await res.text()).toBe('404 Not Found');
	});

	test.each([
		['malformed JSON', '{"hvemRoses": ', 400, 'Malformed JSON in request body'],
		['JSON over 100kb', JSON.stringify({ melding: 'x'.repeat(110_000) }), 413, 'Payload Too Large'],
	])('%s to mottak gets %i without CSP', async (_, body, status, text) => {
		const res = await postJson(server, `${API}/mottak/ros`, body);

		expect(res.status).toBe(status);
		expect(res.headers.get('content-security-policy')).toBeNull();
		expect(await res.text()).toBe(text);
	});

	test('compresses responses for clients that accept gzip', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage`, {
			headers: { 'accept-encoding': 'gzip' },
		});

		expect(res.status).toBe(200);
		expect(res.headers.get('content-encoding')).toBe('gzip');
	});
});
