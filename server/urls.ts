import { env } from '#server/utils/environment.ts';

export const URLs = {
	norg2Path: '/norg2/api/v1/enhet?enhetStatusListe=AKTIV',
	norg2Origin: env.NORG2_ORIGIN,
};
