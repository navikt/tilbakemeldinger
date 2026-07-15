import {
    getAnalyticsInstance,
    Events,
    type NavigereProperties,
} from '@navikt/nav-dekoratoren-moduler';

const analytics = getAnalyticsInstance('tilbakemeldinger');

export const logLinkClick = (
    href: string,
    linkText: string | undefined,
    linkGroup?: string
) => {
    const properties: NavigereProperties = {
        lenketekst: linkText || '',
        destinasjon: href,
        lenkegruppe: linkGroup,
    };

    analytics(Events.NAVIGERE, properties);
};

export const logPageview = (title: string) =>
    analytics(Events.BESOK, {
        sidetittel: title,
    });
