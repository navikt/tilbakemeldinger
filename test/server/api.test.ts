import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { API, startServer, type TestServer } from './server';
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

	test.each(['isAlive', 'isReady'])('%s', async (probe) => {
		const res = await server.fetch(`${API}/internal/${probe}`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toMatch(/^text\/plain/);
		expect(res.headers.get('content-security-policy')).toBeNull();
		expect(await res.text()).toBe('OK');
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

	test('enheter asks norg2 once, and answers from its cache after that', async () => {
		await server.fetch(`${API}/enheter`);
		const res = await server.fetch(`${API}/enheter`);

		expect(res.status).toBe(200);
		expect(server.stub.find('norg2.test', '/norg2/api/v1/enhet')).toHaveLength(1);
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
		expect(await res.text()).toBe('Internal Server Error');
	});
});

describe('enheter when norg2 fails', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer({
			routes: [
				{
					host: 'norg2.test',
					path: '/norg2/api/v1/enhet',
					reply: () => ({ headers: { 'content-type': 'application/json' }, body: '{}' }),
				},
			],
		});
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('answers 500 when norg2 does not return a list', async () => {
		const res = await server.fetch(`${API}/enheter`);

		expect(res.status).toBe(500);
		expect(await res.text()).toBe('Lasting av enheter feilet');
	});
});

describe('enheter when norg2 starts failing', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		vi.useRealTimers();
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('keeps answering with the last list, and refreshes it in the background', async () => {
		const norg2Requests = () => server.stub.find('norg2.test', '/norg2/api/v1/enhet').length;
		expect((await server.fetch(`${API}/enheter`)).status).toBe(200);
		server.stub.route({ host: 'norg2.test', path: '/norg2/api/v1/enhet', reply: () => ({ status: 503 }) });

		// Past the hour the list is fresh for
		vi.useFakeTimers({ toFake: ['Date'] });
		vi.setSystemTime(Date.now() + 2 * 60 * 60 * 1000);
		const res = await server.fetch(`${API}/enheter`);

		expect(res.status).toBe(200);
		expect(await res.json()).toHaveLength(ENHETER.length);
		await vi.waitFor(() => expect(norg2Requests()).toBe(2));
	});
});
