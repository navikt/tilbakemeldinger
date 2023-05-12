const Environment = () => {
    const isLocal = process.env.NODE_ENV === 'development';
    const isDev = process.env.REACT_APP_ENV === 'dev';
    const host = isLocal ? 'http://localhost:8080' : process.env.REACT_APP_HOST;

    if (isLocal) {
        return {
            baseUrl: host,
            appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
            authUrl: `${host}/person/nav-dekoratoren-api/auth`,
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: `https://www.intern.dev.nav.no/mine-saker`,
            loginUrl: `${host}/personbruker-api/local/cookie`,
            klageUrl: `https://klage.intern.dev.nav.no`,
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
            loginUrl: 'https://login.intern.dev.nav.no/oauth2/login',
            klageUrl: 'https://klage.intern.dev.nav.no',
        };
    }

    return {
        baseUrl: host,
        appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
        authUrl: `${host}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${host}/person/personopplysninger-api`,
        mineSakerUrl: 'https://person.nav.no/mine-saker',
        loginUrl: 'https://login.nav.no/oauth2/login',
        klageUrl: 'https://klage.nav.no',
    };
};

export default Environment;
