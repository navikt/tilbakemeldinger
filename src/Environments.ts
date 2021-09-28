import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const isDevSbs = host.startsWith("www.dev");
  const isDevGcp = host.startsWith("person.dev");
  const baseAppPath = `${forsidePath}`;

  // Localhost
  if (process.env.NODE_ENV === `development`) {
    return {
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}`,
      apiUrl: `http://localhost:8080/person/tilbakemeldinger-api`,
      authUrl: `http://localhost:8080/person/innloggingsstatus/auth`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester.nav.no`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
    };
  }

  if (isDevGcp) {
    return {
      baseUrl: `https://person.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://person.dev.nav.no${baseAppPath}`,
      apiUrl: `https://person.dev.nav.no/person/tilbakemeldinger-api`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://person.dev.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-q1.nav.no`,
      loginUrl: `https://loginservice.dev.nav.no/login`,
      logoutUrl: `https://loginservice.dev.nav.no/slo`,
    };
  }

  if (isDevSbs) {
    return {
      baseUrl: `https://www.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www.dev.nav.no${baseAppPath}`,
      apiUrl: `https://www.dev.nav.no/person/tilbakemeldinger-api`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://www.dev.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-q1.nav.no`,
      loginUrl: `https://loginservice.dev.nav.no/login`,
      logoutUrl: `https://loginservice.dev.nav.no/slo`,
    };
  }

  return {
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}`,
    apiUrl: `https://www.nav.no/person/tilbakemeldinger-api`,
    authUrl: `https://www.nav.no/person/innloggingsstatus/auth`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    tjenesteUrl: `https://tjenester.nav.no`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
  };
};

export default Environment;
