import { afterEach, expect, test, vi } from 'vitest';
import { isHttpError } from '@itsy/corgi';
import { fetchEnheter, postServiceKlage } from './apiClient.ts';
import { errorCodeOf } from '#client/types/errors.ts';
import type { ServiceKlage } from '#shared/types/ServiceKlage.ts';

afterEach(() => {
	vi.unstubAllGlobals();
});

const answer = (status: number, contentType: string, body: string) =>
	vi.stubGlobal(
		'fetch',
		vi.fn(async () => new Response(body, { status, headers: { 'content-type': contentType } }))
	);

test('an error with a body that is not JSON throws an HttpError with its status', async () => {
	answer(502, 'text/plain', 'Bad gateway');

	const error = await postServiceKlage({} as ServiceKlage).catch((e: unknown) => e);

	expect(isHttpError(error) && error.status).toBe(502);
	expect(errorCodeOf(error)).toBeUndefined();
});

test('the errorCode in an error with a JSON body is read', async () => {
	answer(400, 'application/json', JSON.stringify({ errorCode: 'EREG_NOT_FOUND' }));

	const error = await postServiceKlage({} as ServiceKlage).catch((e: unknown) => e);

	expect(errorCodeOf(error)).toBe('EREG_NOT_FOUND');
});

test('a GET returns the parsed body', async () => {
	answer(200, 'application/json', JSON.stringify([{ enhetNr: '0301' }]));

	await expect(fetchEnheter()).resolves.toEqual([{ enhetNr: '0301' }]);
});
