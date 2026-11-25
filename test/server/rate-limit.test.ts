// oxlint-disable no-await-in-loop -- the limiters count requests in the order they arrive
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, postJson, startServer, type TestServer } from './server';
import { expectNoUnexpectedHosts } from './fixtures';

// Requests reach the test server from 127.0.0.1 (server.ts), which plays the role of the ingress
// and the sidecar: X-Forwarded-For says who the client is, just like in the cluster.
// An empty body fails validation (400), which still counts against the limits.

const post = (server: TestServer, forwardedFor?: string) =>
	postJson(server, `${API}/mottak/ros`, {}, forwardedFor ? { 'x-forwarded-for': forwardedFor } : {});

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
			const res = await post(server, '203.0.113.1');
			expect(res.status, `request ${i}`).toBe(400);
		}

		const res = await post(server, '203.0.113.1');

		expect(res.status).toBe(429);
		expect(res.headers.get('content-type')).toBe('text/plain; charset=UTF-8');
		expect(res.headers.get('ratelimit-limit')).toBe('5');
		expect(await res.text()).toBe('Rate limit IP');
	});
});

describe('rate limits are per client', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('one client hitting the limit does not block another', async () => {
		for (let i = 1; i <= 5; i++) {
			expect((await post(server, '203.0.113.1')).status, `request ${i}`).toBe(400);
		}
		expect((await post(server, '203.0.113.1')).status).toBe(429);

		expect((await post(server, '203.0.113.2')).status).toBe(400);
	});

	test('entries the client adds to X-Forwarded-For are ignored', async () => {
		// The client sends its own X-Forwarded-For, the ingress appends the real address,
		// and an internal hop after it is skipped
		for (let i = 1; i <= 5; i++) {
			const res = await post(server, `198.51.100.${i}, 203.0.113.3, 10.0.0.7`);
			expect(res.status, `request ${i}`).toBe(400);
		}

		const res = await post(server, '198.51.100.99, 203.0.113.3, 10.0.0.7');

		expect(res.status).toBe(429);
	});

	test('IPv6 clients in the same /56 share a limit', async () => {
		for (let i = 1; i <= 5; i++) {
			const res = await post(server, `2001:db8:0:1${i}::1`);
			expect(res.status, `request ${i}`).toBe(400);
		}

		expect((await post(server, '2001:db8:0:ff::1')).status).toBe(429);
		expect((await post(server, '2001:db8:0:100::1')).status).toBe(400);
	});

	test('the 30 minute limit is not shared between clients', async () => {
		// 120 requests in total, at most 5 per client, which is more than the 100 one client gets
		for (let client = 10; client < 34; client++) {
			for (let i = 1; i <= 5; i++) {
				const res = await post(server, `203.0.113.${client}`);
				expect(res.status, `client ${client}, request ${i}`).toBe(400);
			}
		}
	});
});

describe('requests without a client address are not limited', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	// Well past the burst limit of 5
	const statuses = async (forwardedFor?: string) => {
		const result: number[] = [];
		for (let i = 1; i <= 10; i++) {
			result.push((await post(server, forwardedFor)).status);
		}
		return result;
	};
	const allPass = Array.from({ length: 10 }, () => 400);

	test('no X-Forwarded-For, so the address is the sidecar', async () => {
		expect(await statuses()).toEqual(allPass);
	});

	test('the BigIP passes on its own address instead of the client', async () => {
		expect(await statuses('192.168.251.254, 35.191.103.54')).toEqual(allPass);
	});

	test('X-Forwarded-For that cannot be resolved', async () => {
		expect(await statuses('not-an-ip, 35.191.0.1')).toEqual(allPass);
	});
});
