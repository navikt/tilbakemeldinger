const Environment = () => {
    const isLocal = import.meta.env.VITE_ENV === 'localhost';
    const isDev = import.meta.env.VITE_ENV === 'dev';
    const host = isLocal
        ? 'http://localhost:8080'
        : import.meta.env.VITE_APP_HOST;
    console.log('isLocal:', isLocal);
    console.log('isDev:', isDev);
    console.log('host:', host);
    console.log('VITE_ENV', import.meta.env.VITE_ENV);

    if (isLocal) {
        return {
            baseUrl: host,
            appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
            authUrl: `${host}/person/nav-dekoratoren-api/auth`,
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: 'https://www.intern.dev.nav.no/mine-saker',
            loginUrl: `${host}/personbruker-api/local/cookie`,
            klageUrl: 'https://www.ekstern.dev.nav.no/klage',
            klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
        };
    }

    if (isDev) {
        return {
            baseUrl: host,
            appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
            authUrl:
                'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: `${host}/mine-saker`,
            loginUrl: 'https://login.ekstern.dev.nav.no/oauth2/login',
            klageUrl: 'https://www.ekstern.dev.nav.no/klage',
            klageUrlEn: 'https://www.ekstern.dev.nav.no/klage/en',
        };
    }

    //isProd
    return {
        baseUrl: host,
        appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
        authUrl: `${host}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${host}/person/personopplysninger-api`,
        mineSakerUrl: 'https://person.nav.no/mine-saker',
        loginUrl: 'https://login.nav.no/oauth2/login',
        klageUrl: 'https://www.nav.no/klage',
        klageUrlEn: 'https://www.nav.no/klage/en',
    };
};

export default Environment;
