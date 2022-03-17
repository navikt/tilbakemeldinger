import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const isDev = host.startsWith("person.dev");
  const baseAppPath = `${forsidePath}`;

  // Localhost
  if (process.env.NODE_ENV === `development`) {
    return {
      baseUrl: `http://www.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}/tilbakemeldinger`,
      apiUrl: `http://localhost:8080/person/tilbakemeldinger-api`,
      authUrl: `http://localhost:8080/person/innloggingsstatus/auth`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      mineSakerUrl: `https://person.nav.no/mine-saker`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
    };
  }

  if (isDev) {
    return {
      baseUrl: `https://person.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://person.dev.nav.no${baseAppPath}/tilbakemeldinger`,
      apiUrl: `https://tilbakemeldinger-api.dev-fss-pub.nais.io`,
      authUrl: `https://innloggingsstatus.dev.nav.no/person/innloggingsstatus/auth`,
      personInfoApiUrl: `https://person.dev.nav.no/person/personopplysninger-api`,
      mineSakerUrl: `https://person.dev.nav.no/mine-saker`,
      loginUrl: `https://loginservice.dev.nav.no/login`,
      logoutUrl: `https://loginservice.dev.nav.no/slo`,
    };
  }

  return {
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}/tilbakemeldinger`,
    apiUrl: `https://tilbakemeldinger-api.prod-fss-pub.nais.io`,
    authUrl: `https://www.nav.no/person/innloggingsstatus/auth`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    mineSakerUrl: `https://person.nav.no/mine-saker`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
  };
};

export default Environment;
