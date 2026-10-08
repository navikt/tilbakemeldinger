import { env } from '#server/utils/environment.ts';

export const URLs = {
	navno404: 'https://www.nav.no/404',
	norg2Path: '/norg2/api/v1/enhet?enhetStatusListe=AKTIV',
	norg2Origin: env.NORG2_ORIGIN,
	allPages: ['tilbakemeldinger', 'serviceklage', 'feil-og-mangler', 'ros-til-nav'],
};
