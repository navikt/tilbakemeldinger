import { getConfig } from '#client/appConfig.ts';

const Environment = () => {
	const { env, origin } = getConfig();
	const isLocal = env === 'localhost';
	const isDev = env === 'dev';

	const commonUrls = {
		baseUrl: origin,
		appUrl: `${origin}/person/kontakt-oss/tilbakemeldinger`,
		personInfoApiUrl: `${origin}/tms-personopplysninger-api`,
	};

	if (isLocal) {
		return {
			authUrl: `${origin}/person/nav-dekoratoren-api/auth`,
			mineSakerUrl: 'https://www.intern.dev.nav.no/mine-saker',
			loginUrl: `https://login.ekstern.dev.nav.no/oauth2/login`,
			klageUrl: 'https://www.ekstern.dev.nav.no/klage',
			klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
			...commonUrls,
		};
	}

	if (isDev) {
		return {
			authUrl: 'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
			mineSakerUrl: `${origin}/mine-saker`,
			loginUrl: 'https://login.ekstern.dev.nav.no/oauth2/login',
			klageUrl: 'https://www.ekstern.dev.nav.no/klage',
			klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
			...commonUrls,
		};
	}

	//isProd
	return {
		authUrl: `${origin}/person/nav-dekoratoren-api/auth`,
		mineSakerUrl: 'https://person.nav.no/mine-saker',
		loginUrl: 'https://login.nav.no/oauth2/login',
		klageUrl: 'https://www.nav.no/klage',
		klageUrlEn: 'https://www.nav.no/klage/en',
		...commonUrls,
	};
};

export default Environment;
