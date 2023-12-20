import Environment from 'src/Environments';

const { klageUrl, klageUrlEn, baseUrl: navUrl } = Environment();

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
