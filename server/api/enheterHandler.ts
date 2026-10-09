import type { Handler } from 'hono';
import { URLs } from '#server/urls.ts';
import type { Enhet } from '#shared/enhet.ts';

const NORG2_API_URL = `${URLs.norg2Origin}${URLs.norg2Path}`;

const transformEnhet = (enhetRaw: Record<string, unknown> & Enhet): Enhet => ({
	enhetNr: enhetRaw.enhetNr,
	status: enhetRaw.status,
	navn: enhetRaw.navn,
	type: enhetRaw.type,
});

export const enheterHandler: Handler = async (c) => {
	const enheter = await fetch(NORG2_API_URL)
		.then((norgRes) => norgRes.json())
		.catch((e) => {
			console.error(`Error fetching enheter from norg2 - ${e}`);
			return null;
		});

	if (!enheter || !Array.isArray(enheter)) {
		return c.text('Lasting av enheter feilet', { status: 500 });
	}

	return c.json(enheter.map(transformEnhet));
};
