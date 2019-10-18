const Environment = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      miljo: "LOCAL",
      baseUrl: "http://localhost:8080",
      appUrl: "http://localhost:8080/person/kontakt-oss",
      apiUrl: "http://localhost:8080/person/tilbakemeldinger-api",
      personInfoApiUrl: "http://localhost:8080/person/personopplysninger-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
      loginUrl: "http://localhost:8080/personbruker-api/local/cookie",
      logoutUrl: "#",
      unleashUrl: "https://www.nav.no/person/dittnav/api/feature",
    };
  }
  if (window.location.hostname.indexOf("www-q0") > -1) {
    return {
      miljo: "DEV",
      baseUrl: "https://www-q0.nav.no",
      appUrl: "https://www-q0.nav.no/person/kontakt-oss",
      apiUrl: "https://www-q0.nav.no/person/tilbakemeldinger-api",
      personInfoApiUrl: "https://www-q0.nav.no/person/personopplysninger-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo",
      unleashUrl: "https://www-q0.nav.no/person/dittnav/api/feature",
    };
  }
  return {
    miljo: "PROD",
    baseUrl: "https://www.nav.no",
    appUrl: "https://www.nav.no/person/kontakt-oss",
    apiUrl: "https://www.nav.no/person/tilbakemeldinger-api",
    personInfoApiUrl: "https://www.nav.no/person/personopplysninger-api",
    tjenesteUrl: "https://tjenester.nav.no",
    loginUrl: "https://loginservice.nav.no/login",
    logoutUrl: "https://loginservice.nav.no/slo",
    unleashUrl: "https://www.nav.no/person/dittnav/api/feature",
  };
};

export default Environment;
