import Environment from './Environments';

const { klageUrl, klageUrlEn, baseUrl: navUrl } = Environment();

export const paths = {
    kontaktOss: {
        forside: '/person/kontakt-oss',
    },
    tilbakemeldinger: {
        forside: '/tilbakemeldinger',
        serviceklage: {
            form: '/tilbakemeldinger/serviceklage',
            login: '/tilbakemeldinger/serviceklage/login',
        },
        feilogmangler: '/tilbakemeldinger/feil-og-mangler',
        rostilnav: '/tilbakemeldinger/ros-til-nav',
    },
};

export const urls = {
    tilbakemeldinger: {
        klagepavedtak: {
            nb: klageUrl,
            nn: klageUrl,
            en: klageUrlEn,
        },
        klagerettigheter: {
            nb: `${navUrl}/klagerettigheter`,
            en: `${navUrl}/klagerettigheter/en`,
            nn: `${navUrl}/klagerettigheter/nn`,
        },
        serviceklage: {
            fullmaktskjema: `${navUrl}/soknader#fullmakt`,
            datatilsynet: `https://www.datatilsynet.no/rettigheter-og-plikter/personopplysninger/`,
        },
    },
};

export const vars = {
    maksLengdeMelding: 10000,
};
