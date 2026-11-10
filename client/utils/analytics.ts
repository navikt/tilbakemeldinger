import { getAnalyticsInstance, Events } from '@navikt/nav-dekoratoren-moduler';

const analytics = getAnalyticsInstance('tilbakemeldinger');

export const logPageview = (title: string) =>
	analytics(Events.BESOK, {
		sidetittel: title,
	});
