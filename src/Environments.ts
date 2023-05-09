const Environment = () => {
    const isLocal = process.env.NODE_ENV === 'development';
    const isDev = process.env.REACT_APP_ENV === 'dev';
    const host = isLocal ? 'http://localhost:8080' : process.env.REACT_APP_HOST;

    if (isLocal) {
        return {
            baseUrl: host,
            appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
            apiUrl: `${host}/person/tilbakemeldinger-api`,
            authUrl: `${host}/person/nav-dekoratoren-api/auth`,
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: `https://www.intern.dev.nav.no/mine-saker`,
            loginUrl: `${host}/personbruker-api/local/cookie`,
            logoutUrl: `#`,
            klageUrl: `https://klage.intern.dev.nav.no`,
        };
    }

    if (isDev) {
        return {
            baseUrl: host,
            appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
            apiUrl: 'https://tilbakemeldinger-api.dev-fss-pub.nais.io',
            authUrl:
                'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: `${host}/mine-saker`,
            loginUrl: 'https://loginservice.intern.dev.nav.no/login',
            logoutUrl: 'https://loginservice.intern.dev.nav.no/slo',
            klageUrl: 'https://klage.intern.dev.nav.no',
        };
    }

    return {
        baseUrl: host,
        appUrl: `${host}/person/kontakt-oss/tilbakemeldinger`,
        apiUrl: 'https://tilbakemeldinger-api.prod-fss-pub.nais.io',
        authUrl: `${host}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${host}/person/personopplysninger-api`,
        mineSakerUrl: 'https://person.nav.no/mine-saker',
        loginUrl: 'https://loginservice.nav.no/login',
        logoutUrl: 'https://loginservice.nav.no/slo',
        klageUrl: 'https://klage.nav.no',
    };
};

export default Environment;
