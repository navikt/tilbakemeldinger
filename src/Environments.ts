const Environment = () => {
    const isLocal = import.meta.env.VITE_ENV === 'localhost';
    const isDev = import.meta.env.VITE_ENV === 'dev';
    const origin = import.meta.env.VITE_APP_ORIGIN;

    if (isLocal) {
        return {
            baseUrl: origin,
            appUrl: `${origin}/person/kontakt-oss/tilbakemeldinger`,
            authUrl: `${origin}/person/nav-dekoratoren-api/auth`,
            personInfoApiUrl: `${origin}/person/personopplysninger-api`,
            mineSakerUrl: 'https://www.intern.dev.nav.no/mine-saker',
            loginUrl: `${origin}/personbruker-api/local/cookie`,
            klageUrl: 'https://www.ekstern.dev.nav.no/klage',
            klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
        };
    }

    if (isDev) {
        return {
            baseUrl: origin,
            appUrl: `${origin}/person/kontakt-oss/tilbakemeldinger`,
            authUrl:
                'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
            personInfoApiUrl: `${origin}/person/personopplysninger-api`,
            mineSakerUrl: `${origin}/mine-saker`,
            loginUrl: 'https://login.ekstern.dev.nav.no/oauth2/login',
            klageUrl: 'https://www.ekstern.dev.nav.no/klage',
            klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
        };
    }

    //isProd
    return {
        baseUrl: origin,
        appUrl: `${origin}/person/kontakt-oss/tilbakemeldinger`,
        authUrl: `${origin}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${origin}/person/personopplysninger-api`,
        mineSakerUrl: 'https://person.nav.no/mine-saker',
        loginUrl: 'https://login.nav.no/oauth2/login',
        klageUrl: 'https://www.nav.no/klage',
        klageUrlEn: 'https://www.nav.no/klage/en',
    };
};

export default Environment;
