import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const isDevSbs = host.startsWith("www.dev");
  const baseAppPath = `${forsidePath}`;

  // Localhost
  if (process.env.NODE_ENV === `development`) {
    return {
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      apiUrl: `http://localhost:8080${baseAppPath}/tilbakemeldinger/api`,
      authUrl: `http://localhost:8080/person/innloggingsstatus/auth`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester.nav.no`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
    };
  }

  if (isDevSbs) {
    return {
      baseUrl: `https://www.dev.nav.no`,
      baseAppPath: baseAppPath,
      apiUrl: `https://www.dev.nav.no${baseAppPath}/tilbakemeldinger/api`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://www.dev.nav.no/person/personopplysninger-api`,
      tjenesteUrl: `https://tjenester-q1.nav.no`,
      loginUrl: `https://loginservice.dev.nav.no/login`,
    };
  }

  return {
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    apiUrl: `https://www.nav.no${baseAppPath}/tilbakemeldinger/api`,
    authUrl: `https://www.nav.no/person/innloggingsstatus/auth`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    tjenesteUrl: `https://tjenester.nav.no`,
    loginUrl: `https://loginservice.nav.no/login`,
  };
};

export default Environment;
