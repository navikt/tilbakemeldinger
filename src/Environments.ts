import { forsidePath, noRedirectUrlSegment } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const subdomain = host.split(`.`)[0];

  const pathname = window.location.pathname;
  const noRedirect = pathname.includes(noRedirectUrlSegment);
  const baseAppPath = `${forsidePath}${noRedirect ? noRedirectUrlSegment : ""}`;

  if (process.env.NODE_ENV === `development`) {
    return {
      miljo: `LOCAL`,
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}`,
      apiUrl: `http://localhost:8080/person/tilbakemeldinger-api`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester.nav.no`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
      unleashUrl: `#`
    };
  }
  if (subdomain !== `www`) {
    // Preprod - Q0, Q1 etc
    const env = subdomain.split(`-`)[1];
    return {
      miljo: `DEV`,
      baseUrl: `https://www-${env}.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www-${env}.nav.no${baseAppPath}`,
      apiUrl: `https://www-${env}.nav.no/person/tilbakemeldinger-api`,
      personInfoApiUrl: `https://www-${env}.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-${env}.nav.no`,
      loginUrl: `https://loginservice-q.nav.no/login`,
      logoutUrl: `https://loginservice-q.nav.no/slo`,
      unleashUrl: `https://www-${env}.nav.no/person/dittnav/api/feature`
    };
  }

  return {
    miljo: `PROD`,
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}`,
    apiUrl: `https://www.nav.no/person/tilbakemeldinger-api`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    tjenesteUrl: `https://tjenester.nav.no`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
    unleashUrl: `https://www.nav.no/person/dittnav/api/feature`
  };
};

export default Environment;
