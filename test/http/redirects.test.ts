import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { BASE, startServer, type TestServer } from './harness';
import { expectNoUnexpectedHosts } from './fixtures';

const EDITORIAL_ORIGIN = 'https://www.nav.test/tilbakemeldinger';

describe('front page redirect to the editorial page', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({ env: { VITE_EDITORIAL_FRONTPAGE_ORIGIN: EDITORIAL_ORIGIN } });
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test.each([
		['/tilbakemeldinger', `${EDITORIAL_ORIGIN}/`],
		['/nb/tilbakemeldinger', `${EDITORIAL_ORIGIN}/`],
		['/nn/tilbakemeldinger', `${EDITORIAL_ORIGIN}/`],
		['/en/tilbakemeldinger', `${EDITORIAL_ORIGIN}/en`],
		['/nb/tilbakemeldinger/', `${EDITORIAL_ORIGIN}/`],
		['/en/tilbakemeldinger?utm_source=test', `${EDITORIAL_ORIGIN}/en`],
	])('%s → 301 %s', async (path, location) => {
		const res = await server.fetch(`${BASE}${path}`);

		expect(res.status).toBe(301);
		expect(res.headers.get('location')).toBe(location);
		expect(res.headers.get('content-security-policy')).toBeTruthy();
	});
});

describe('local environment (ENV=localhost)', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({ env: { ENV: 'localhost' } });
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('fetches the CSP from the prod decorator', () => {
		expect(server.stub.find('www.nav.no', '/dekoratoren/api/csp').length).toBeGreaterThan(0);
		expect(server.stub.find('dekoratoren.ekstern.dev.nav.no')).toEqual([]);
	});
});

describe('front page without an editorial page to redirect to', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({ env: { ENV: 'localhost' } });
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('/tilbakemeldinger → 302 to the default locale', async () => {
		const res = await server.fetch(`${BASE}/tilbakemeldinger?a=1`);

		expect(res.status).toBe(302);
		expect(res.headers.get('location')).toBe(`${BASE}/nb/tilbakemeldinger?a=1`);
	});

	test.each([
		['nb', 'Klage og tilbakemelding'],
		['en', 'Complaints and feedback'],
	])('/%s/tilbakemeldinger lists the forms', async (locale, heading) => {
		const res = await server.fetch(`${BASE}/${locale}/tilbakemeldinger`);
		const html = await res.text();

		expect(res.status).toBe(200);
		expect(html).toContain(`<h1>${heading}</h1>`);
		for (const page of ['serviceklage', 'feil-og-mangler', 'ros-til-nav']) {
			expect(html).toContain(`href="${BASE}/${locale}/tilbakemeldinger/${page}"`);
		}
	});
});
