import { env } from '#server/env.ts';

export const URLs = {
	norg2Path: '/norg2/api/v1/enhet?enhetStatusListe=AKTIV',
	norg2Origin: env.NORG2_ORIGIN,
};
