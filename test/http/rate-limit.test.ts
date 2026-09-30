import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, postJson, startServer, type TestServer } from './harness';
import { expectNoUnexpectedHosts } from './fixtures';

// Only the threshold is pinned here. What the limits are keyed on is a known
// bug and will change deliberately in its own PR.
describe('rate limiting of mottak', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('the 6th POST within the window gets 429', async () => {
		for (let i = 1; i <= 5; i++) {
			const res = await postJson(server, `${API}/mottak/ros`, {});
			expect(res.status, `request ${i}`).toBe(400);
		}

		const res = await postJson(server, `${API}/mottak/ros`, {});

		expect(res.status).toBe(429);
		expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
		expect(res.headers.get('ratelimit-limit')).toBe('5');
		expect(await res.text()).toBe('Rate limit IP');
	});
});
