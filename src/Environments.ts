import { env, isDev, isLocalhost } from './env';

const Environment = () => {
    const origin = env.VITE_APP_ORIGIN;

    const commonUrls = {
        baseUrl: origin,
        appUrl: `${origin}/person/kontakt-oss/tilbakemeldinger`,
        personInfoApiUrl: `${origin}/tms-personopplysninger-api`,
    };

    if (isLocalhost) {
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
            authUrl:
                'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
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
