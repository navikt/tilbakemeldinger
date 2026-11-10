import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { BASE, startServer, type TestServer } from './server';
import { expectNoUnexpectedHosts } from './fixtures';

// The decorator the server gets its CSP from, with ENV=dev
const DECORATOR = 'dekoratoren.ekstern.dev.nav.no';

describe('the CSP header', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		vi.useRealTimers();
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	// A POST to a page is a quick 404, with the header
	const csp = async () =>
		(await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage`, { method: 'POST' })).headers.get(
			'content-security-policy'
		);
	const decoratorRequests = () => server.stub.find(DECORATOR, '/api/csp').length;

	test('a refresh the decorator does not answer keeps the last header', async () => {
		const header = await csp();
		expect(header).toContain('https://stub.test');
		expect(decoratorRequests()).toBe(1);
		server.stub.route({ host: DECORATOR, path: '/api/csp', reply: () => ({ status: 503 }) });

		// Past the 10 minutes the header is fresh for: the next request starts a refresh, and still gets the header
		vi.useFakeTimers({ toFake: ['performance'] });
		vi.advanceTimersByTime(60 * 60 * 1000);
		// lru-cache reuses a clock reading for a millisecond
		await new Promise((resolve) => setTimeout(resolve, 5));
		expect(await csp()).toBe(header);

		// The decorator module tries 4 times, then gives its permissive fallback, which isn't kept
		await vi.waitFor(() => expect(decoratorRequests()).toBe(5));
		expect(await csp()).toBe(header);
	});
});
