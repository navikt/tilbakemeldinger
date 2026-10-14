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
	])('%s → 301 %s', async (path, location) => {
		const res = await server.fetch(`${BASE}${path}`);

		expect(res.status).toBe(301);
		expect(res.headers.get('location')).toBe(location);
		expect(res.headers.get('content-security-policy')).toBeTruthy();
	});

	test.each(['/nb/tilbakemeldinger/', '/nb/tilbakemeldinger?utm_source=test'])(
		'%s is rendered, not redirected',
		async (path) => {
			const res = await server.fetch(`${BASE}${path}`);

			expect(res.status).toBe(200);
			expect(res.headers.get('location')).toBeNull();
		}
	);
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
