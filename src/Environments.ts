import { forsidePath } from "./Config";

const Environment = () => {
    const host = window.location.host;
    const isDev = process.env.ENV === 'dev';
    const baseAppPath = `${forsidePath}`;

    // Localhost
    if (process.env.NODE_ENV === `development`) {
        return {
          baseUrl: host,
          baseAppPath: baseAppPath,
          appUrl: `http://localhost:8080${baseAppPath}/tilbakemeldinger`,
          apiUrl: `http://localhost:8080/person/tilbakemeldinger-api`,
          authUrl: `http://localhost:8080/person/nav-dekoratoren-api/auth`,
          personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
          mineSakerUrl: `https://www.intern.dev.nav.no/mine-saker`,
          loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
          logoutUrl: `#`,
          klageUrl: `http://klage.intern.dev.nav.no`,
        };
    }

    // Midlertidig til wonderwall også tas i bruk i Prod
    const wonderwallDevUrl = 'login.ekstern.dev.nav.no/oauth2';
    return {
        baseUrl: host,
        baseAppPath: baseAppPath,
        appUrl: `${host}${baseAppPath}/tilbakemeldinger`,
        apiUrl: `https://tilbakemeldinger-api.${isDev?'dev':'prod'}-fss-pub.nais.io`,
        authUrl: `${host}/person/nav-dekoratoren-api/auth`,
        personInfoApiUrl: `${host}/person/personopplysninger-api`,
        mineSakerUrl: `${isDev?host:'person.nav.no'}/mine-saker`,
        loginUrl: `https://${isDev?wonderwallDevUrl:'loginservice.nav.no'}/login`,
        logoutUrl: `https://${isDev?wonderwallDevUrl+'/logout':'loginservice.nav.no/slo'}`,
        klageUrl: `http://klage.${isDev?'intern.dev':''}.nav.no`,
    };
};

export default Environment;
