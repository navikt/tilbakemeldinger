import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { API, startServer, type TestServer } from './harness';
import { ENHETER } from './stub';
import { expectNoUnexpectedHosts, unsignedJwt } from './fixtures';

describe('GET endpoints', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test.each([
		['isAlive', { message: 'I am alive!' }],
		['isReady', { message: 'I am ready!' }],
	])('%s', async (probe, body) => {
		const res = await server.fetch(`${API}/internal/${probe}`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('application/json; charset=utf-8');
		expect(res.headers.get('content-security-policy')).toBeNull();
		expect(await res.json()).toEqual(body);
	});

	test('enheter returns the norg2 units with four fields', async () => {
		const res = await server.fetch(`${API}/enheter`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-security-policy')).toBeNull();
		expect(await res.json()).toEqual(
			ENHETER.map(({ enhetNr, navn, type, status }) => ({ enhetNr, navn, type, status }))
		);
		expect(server.stub.find('norg2.test', '/norg2/api/v1/enhet').at(-1)?.query.get('enhetStatusListe')).toBe('AKTIV');
	});

	test('enheter answers 500 when norg2 does not return a list', async () => {
		server.stub.route({
			host: 'norg2.test',
			path: '/norg2/api/v1/enhet',
			reply: () => ({ headers: { 'content-type': 'application/json' }, body: '{}' }),
		});
		const res = await server.fetch(`${API}/enheter`);

		expect(res.status).toBe(500);
		expect(await res.text()).toBe('Lasting av enheter feilet');
	});

	test.each([
		['no authorization header', undefined],
		['a header without "Bearer "', 'garbage'],
	])('fodselsnr answers 401 for %s', async (_, authorization) => {
		const res = await server.fetch(`${API}/fodselsnr`, { headers: authorization ? { authorization } : {} });

		expect(res.status).toBe(401);
		expect(await res.text()).toBe('');
	});

	test('fodselsnr returns pid from the (unverified) bearer token', async () => {
		const res = await server.fetch(`${API}/fodselsnr`, {
			headers: { authorization: `Bearer ${unsignedJwt({ pid: '12345678901' })}` },
		});

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ fodselsnr: '12345678901' });
	});

	test('fodselsnr answers 500 for a malformed bearer token', async () => {
		const res = await server.fetch(`${API}/fodselsnr`, { headers: { authorization: 'Bearer garbage' } });

		expect(res.status).toBe(500);
		expect(await res.text()).toBe('');
	});
});
