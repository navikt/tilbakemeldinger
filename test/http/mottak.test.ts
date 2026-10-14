import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, postJson, startServer, type TestServer } from './harness';
import { expectNoUnexpectedHosts, FEIL_OG_MANGLER, ROS, SERVICEKLAGE, unsignedJwt } from './fixtures';

const UPSTREAM = 'tilbakemeldingsmottak-api.test';

// Every POST to /mottak counts against the IP rate limit (5 per 2 minutes, and
// all requests come from 127.0.0.1), so each group uses its own server with at
// most 5 POSTs, sent one at a time.

describe('forwarding to tilbakemeldingsmottak-api', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({
			routes: [
				{
					host: UPSTREAM,
					path: '/rest/ros',
					reply: () => ({
						status: 201,
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({ id: 'kvittering-1' }),
					}),
				},
			],
		});
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test.each([
		['ros', '/rest/ros', ROS],
		['feil-og-mangler', '/rest/feil-og-mangler', FEIL_OG_MANGLER],
		['serviceklage', '/rest/v2/serviceklage', SERVICEKLAGE],
	])('%s → %s with the Azure AD token and the raw body', async (path, upstreamPath, body) => {
		const res = await postJson(server, `${API}/mottak/${path}`, body);

		const upstream = server.stub.find(UPSTREAM, upstreamPath);
		expect(upstream).toHaveLength(1);
		expect(upstream[0].headers.authorization).toBe('Bearer azure-token');
		expect(upstream[0].headers['content-type']).toBe('application/json');
		expect(JSON.parse(upstream[0].body)).toEqual(body);

		// Upstream status and JSON body are passed through
		if (path === 'ros') {
			expect(res.status).toBe(201);
			expect(await res.json()).toEqual({ id: 'kvittering-1' });
		} else {
			expect(res.status).toBe(200);
			expect(await res.json()).toEqual({});
		}
	});

	test('serviceklage from a logged-in user uses a TokenX token', async () => {
		const userToken = unsignedJwt({ pid: '12345678901' });
		const res = await postJson(server, `${API}/mottak/serviceklage`, SERVICEKLAGE, {
			authorization: `Bearer ${userToken}`,
		});

		expect(res.status).toBe(200);

		const exchange = new URLSearchParams(server.stub.find('tokenx.test', '/token').at(-1)?.body);
		expect(exchange.get('grant_type')).toBe('urn:ietf:params:oauth:grant-type:token-exchange');
		expect(exchange.get('subject_token')).toBe(userToken);
		expect(exchange.get('audience')).toBe('dev-gcp:teamserviceklage:tilbakemeldingsmottak-api');

		const upstream = server.stub.find(UPSTREAM, '/rest/v2/serviceklage').at(-1);
		expect(upstream?.headers.authorization).toBe('Bearer tokenx-token');
	});

	test('rejects an unknown mottak path', async () => {
		const res = await postJson(server, `${API}/mottak/ros-til-nav`, ROS);

		expect(res.status).toBe(404);
		expect(res.headers.get('content-type')).toBe('text/plain; charset=UTF-8');
		expect(await res.text()).toBe('Path not found');
	});
});

describe('errors from tilbakemeldingsmottak-api and invalid input', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	const upstreamReplies = (reply: Parameters<TestServer['stub']['route']>[0]['reply']) =>
		server.stub.route({ host: UPSTREAM, path: '/rest/ros', reply });

	test('passes a JSON error through', async () => {
		upstreamReplies(() => ({
			status: 400,
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ errorCode: 'EREG_NOT_FOUND' }),
		}));
		const res = await postJson(server, `${API}/mottak/ros`, ROS);

		expect(res.status).toBe(400);
		expect(res.headers.get('content-type')).toBe('application/json');
		expect(await res.json()).toEqual({ errorCode: 'EREG_NOT_FOUND' });
	});

	test('passes a text error through', async () => {
		upstreamReplies(() => ({ status: 502, headers: { 'content-type': 'text/plain' }, body: 'Bad gateway' }));
		const res = await postJson(server, `${API}/mottak/ros`, ROS);

		expect(res.status).toBe(502);
		expect(res.headers.get('content-type')).toBe('text/plain; charset=UTF-8');
		expect(await res.text()).toBe('Bad gateway');
	});

	test('answers 500 when the upstream connection fails', async () => {
		upstreamReplies(() => 'destroy');
		const res = await postJson(server, `${API}/mottak/ros`, ROS);

		expect(res.status).toBe(500);
		expect(await res.text()).toBe('Internal server error');
	});

	test('rejects a body that fails schema validation', async () => {
		const res = await postJson(server, `${API}/mottak/ros`, { hvemRoses: 'NAV_KONTAKTSENTER', melding: '   ' });

		expect(res.status).toBe(400);
		expect(res.headers.get('content-type')).toBe('text/plain; charset=UTF-8');
		expect(await res.text()).toBe('Feil i validering av skjema');
	});

	test('accepts a trailing slash on the mottak path', async () => {
		upstreamReplies(() => ({ status: 200, headers: { 'content-type': 'application/json' }, body: '{}' }));
		const before = server.stub.find(UPSTREAM, '/rest/ros').length;
		const res = await postJson(server, `${API}/mottak/ros/`, ROS);

		expect(res.status).toBe(200);
		expect(server.stub.find(UPSTREAM, '/rest/ros')).toHaveLength(before + 1);
	});
});

describe('without an access token', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({
			routes: [
				{
					host: 'login.microsoftonline.com',
					path: /\/oauth2\/v2\.0\/token$/,
					reply: () => ({
						status: 500,
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify({ error: 'server_error' }),
					}),
				},
			],
		});
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('answers 500 and does not call upstream', async () => {
		const res = await postJson(server, `${API}/mottak/ros`, ROS);

		expect(res.status).toBe(500);
		expect(await res.text()).toBe('Failed to populate auth header');
		expect(server.stub.find(UPSTREAM)).toEqual([]);
	});
});
