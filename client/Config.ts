import Environment from '#client/Environments.ts';

// A function, since the app gets its config before it renders, after this has loaded
export const urls = () => {
	const { baseUrl: navUrl } = Environment();

	return {
		tilbakemeldinger: {
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
};

export const vars = {
	maksLengdeMelding: 10000,
	maksLengdeMeldingServiceKlage: 1000,
};
