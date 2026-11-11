import type { Handler } from 'hono';
import { corgi } from '@itsy/corgi';
import { swr } from '@itsy/corgi/swr';
import { withTimeout } from '@itsy/corgi/timeout';
import { URLs } from '#server/urls.ts';
import type { Enhet } from '#shared/enhet.ts';

const NORG2_API_URL = `${URLs.norg2Origin}${URLs.norg2Path}`;

const transformEnhet = (enhetRaw: Record<string, unknown> & Enhet): Enhet => ({
	enhetNr: enhetRaw.enhetNr,
	status: enhetRaw.status,
	navn: enhetRaw.navn,
	type: enhetRaw.type,
});

// The offices rarely change, so they're highly cacheable.
const norg2 = corgi.create({
	plugins: [
		swr({
			fresh: 60 * 60 * 1000,
			stale: Infinity,
			errorBackoff: 60 * 1000,
			accept: async (res) => res.ok && Array.isArray(await res.json()),
			// A refresh that failed, or that norg2 answered without a list
			onError: ({ error, response }) =>
				console.error('Error refreshing enheter from norg2', error ?? `(${String(response?.status)} without a list)`),
		}),
		withTimeout(10_000),
	],
});

export const enheterHandler: Handler = async (c) => {
	try {
		const enheter = await norg2.get(NORG2_API_URL);
		if (Array.isArray(enheter)) {
			return c.json(enheter.map(transformEnhet));
		}
		console.error('Error fetching enheter from norg2 - no list');
	} catch (e) {
		console.error(`Error fetching enheter from norg2 - ${String(e)}`);
	}

	return c.text('Lasting av enheter feilet', { status: 500 });
};
