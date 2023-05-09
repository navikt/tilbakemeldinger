import { logAmplitudeEvent as logAmplitudeEventDecorator } from '@navikt/nav-dekoratoren-moduler';

// eslint-disable-next-line
const logAmplitudeEventProd = (eventName: string, data?: any) => {
    logAmplitudeEventDecorator({
        origin: 'tilbakemeldinger',
        eventName,
        eventData: data,
    });
};

// eslint-disable-next-line
const logAmplitudeEventDev = (eventName: string, data?: any) => {
    console.log(
        `Amplitude event fired: ${eventName} - data: ${JSON.stringify(data)}`
    );
};

export const logAmplitudeEvent =
    process.env.NODE_ENV === 'development'
        ? logAmplitudeEventDev
        : logAmplitudeEventProd;

export const logLinkClick = (
    href: string,
    linkText: string | undefined,
    linkGroup?: string
) => {
    logAmplitudeEvent('navigere', {
        destinasjon: href,
        lenketekst: linkText,
        lenkegruppe: linkGroup,
    });
};

export const logPageview = (title: string) =>
    logAmplitudeEvent('sidevisning', {
        sidetittel: title,
    });
