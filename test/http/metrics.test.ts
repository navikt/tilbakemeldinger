import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, postJson, startServer, type TestServer } from './harness';
import { expectNoUnexpectedHosts, FEIL_OG_MANGLER, ROS, SERVICEKLAGE } from './fixtures';

const UPSTREAM = 'tilbakemeldingsmottak-api.test';

const types = ['serviceklage', 'feil-og-mangler', 'ros'];
const reasons = ['validation', 'rate_limit', 'auth', 'upstream', 'internal', 'unknown'];

// Every series at 0, keyed "<type> <result> <reason>"
const zero = Object.fromEntries(
	types.flatMap((type) => [[`${type} success none`, 0], ...reasons.map((reason) => [`${type} failure ${reason}`, 0])])
);

describe('submission metrics', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({
			routes: [
				{
					host: UPSTREAM,
					path: '/rest/v2/serviceklage',
					reply: () => ({ status: 502, headers: { 'content-type': 'text/plain' }, body: 'Bad gateway' }),
				},
			],
		});
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	const submissions = async () => {
		const res = await server.fetch('/internal/metrics');
		expect(res.status).toBe(200);
		// Prometheus text format; parameter order doesn't matter
		const contentType = res.headers.get('content-type') ?? '';
		expect(contentType.split(';')[0]).toBe('text/plain');
		expect(contentType).toContain('version=0.0.4');

		const counts: Record<string, number> = {};
		for (const [, labels, value] of (await res.text()).matchAll(
			/^tilbakemeldinger_submissions_total\{(.*)\} (\d+)$/gm
		)) {
			const { type, result, reason } = Object.fromEntries(
				[...labels.matchAll(/(\w+)="([^"]*)"/g)].map(([, k, v]) => [k, v])
			);
			counts[`${type} ${result} ${reason}`] = Number(value);
		}
		return counts;
	};

	test('every series starts at 0', async () => {
		expect(await submissions()).toEqual(zero);
	});

	test('counts by type, result and reason, including submissions the rate limiter rejects', async () => {
		// One client, so the sixth POST hits the burst limit of five
		const post = (path: string, body: unknown) =>
			postJson(server, `${API}/mottak/${path}`, body, { 'x-forwarded-for': '203.0.113.1' });

		const statuses = [];
		statuses.push((await post('ros', ROS)).status);
		statuses.push((await post('feil-og-mangler', { ...FEIL_OG_MANGLER, melding: '' })).status);
		statuses.push((await post('serviceklage', SERVICEKLAGE)).status);
		statuses.push((await post('ros-til-nav', ROS)).status);
		statuses.push((await post('ros', {})).status);
		statuses.push((await post('ros', ROS)).status);
		expect(statuses).toEqual([200, 400, 502, 404, 400, 429]);

		// Unknown types (ros-til-nav) aren't counted
		await expect.poll(submissions).toEqual({
			...zero,
			'ros success none': 1,
			'ros failure validation': 1,
			'ros failure rate_limit': 1,
			'feil-og-mangler failure validation': 1,
			'serviceklage failure upstream': 1,
		});
	});
});
