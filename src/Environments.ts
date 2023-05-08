import { forsidePath } from "./Config";

const Environment = () => {
  const host = window.location.host;
  const isDev = host.startsWith("www.intern.dev");
  const baseAppPath = `${forsidePath}`;

  // Localhost
  if (process.env.NODE_ENV === `development`) {
    return {
      baseUrl: `http://www.intern.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `http://localhost:8080${baseAppPath}/tilbakemeldinger`,
      authUrl: `http://localhost:8080/person/nav-dekoratoren-api/auth`,
      personInfoApiUrl: `http://localhost:8080/person/personopplysninger-api`,
      mineSakerUrl: `https://person.nav.no/mine-saker`,
      loginUrl: `http://localhost:8080/personbruker-api/local/cookie`,
      logoutUrl: `#`,
      klageUrl: `http://klage.intern.dev.nav.no`,
    };
  }

  if (isDev) {
    return {
      baseUrl: `https://www.intern.dev.nav.no`,
      baseAppPath: baseAppPath,
      appUrl: `https://www.intern.dev.nav.no${baseAppPath}/tilbakemeldinger`,
      authUrl: `https://www.intern.dev.nav.no/person/nav-dekoratoren-api/auth`,
      personInfoApiUrl: `https://person.ekstern.dev.nav.no/person/personopplysninger-api`,
      mineSakerUrl: `https://person.intern.dev.nav.no/mine-saker`,
      loginUrl: `https://loginservice.intern.dev.nav.no/login`,
      logoutUrl: `https://loginservice.intern.dev.nav.no/slo`,
      klageUrl: `http://klage.intern.dev.nav.no`,
    };
  }

  return {
    baseUrl: `https://www.nav.no`,
    baseAppPath: baseAppPath,
    appUrl: `https://www.nav.no${baseAppPath}/tilbakemeldinger`,
    authUrl: `https://www.nav.no/person/nav-dekoratoren-api/auth`,
    personInfoApiUrl: `https://www.nav.no/person/personopplysninger-api`,
    mineSakerUrl: `https://person.nav.no/mine-saker`,
    loginUrl: `https://loginservice.nav.no/login`,
    logoutUrl: `https://loginservice.nav.no/slo`,
    klageUrl: `https://klage.nav.no`,
  };
};

export default Environment;
