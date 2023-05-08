import { forsidePath } from './Config';

const Environment = () => {
    const baseAppPath = `${forsidePath}`;
    const isLocal = process.env.NODE_ENV === 'development';
    const isDev = process.env.ENV === 'dev';
    const host = isLocal
        ? 'http://localhost:8080'
        : isDev
        ? 'https://www.intern.dev.nav.no'
        : 'https://www.nav.no';

    if (isLocal) {
        return {
            baseUrl: host,
            baseAppPath: baseAppPath,
            appUrl: `${host}${baseAppPath}/tilbakemeldinger`,
            apiUrl: `${host}/person/tilbakemeldinger-api`,
            authUrl: `${host}/person/nav-dekoratoren-api/auth`,
            personInfoApiUrl: `${host}/person/personopplysninger-api`,
            mineSakerUrl: `https://www.intern.dev.nav.no/mine-saker`,
            loginUrl: `${host}/personbruker-api/local/cookie`,
            logoutUrl: `#`,
            klageUrl: `https://klage.intern.dev.nav.no`,
        };
    }

    // Midlertidig til wonderwall også tas i bruk i Prod
    const wonderwallDevUrl = 'login.ekstern.dev.nav.no/oauth2';
    return {
        baseUrl: host,
        baseAppPath: baseAppPath,
        appUrl: `${host}${baseAppPath}/tilbakemeldinger`,
        apiUrl: `https://tilbakemeldinger-api.${
            isDev ? 'dev' : 'prod'
        }-fss-pub.nais.io`,
        authUrl: `${host}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${host}/person/personopplysninger-api`,
        mineSakerUrl: `${isDev ? host : 'person.nav.no'}/mine-saker`,
        loginUrl: `https://${
            isDev ? wonderwallDevUrl : 'loginservice.nav.no'
        }/login`,
        logoutUrl: `https://${
            isDev ? wonderwallDevUrl + '/logout' : 'loginservice.nav.no/slo'
        }`,
        klageUrl: `https://klage.${isDev ? 'intern.dev' : ''}.nav.no`,
    };
};

export default Environment;
