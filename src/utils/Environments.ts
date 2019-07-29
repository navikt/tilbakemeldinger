const Environment = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      miljo: "LOCAL",
      baseUrl: "http://localhost:8080",
      appUrl: "http://localhost:8080/person/tilbakemeldinger",
      apiUrl: "http://localhost:8080/person/tilbakemeldinger-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
      loginUrl: "http://localhost:8080/personbruker-api/local/cookie",
      logoutUrl: "#"
    };
  }
  if (window.location.hostname.indexOf("www-q0") > -1) {
    return {
      miljo: "DEV",
      baseUrl: "https://www-q0.nav.no",
      appUrl: "https://www-q0.nav.no/person/tilbakemeldinger",
      apiUrl: "https://www-q0.nav.no/person/tilbakemeldinger-api",
      tjenesteUrl: "https://tjenester-q0.nav.no",
      loginUrl: "https://loginservice-q.nav.no/login",
      logoutUrl: "https://loginservice-q.nav.no/slo"
    };
  }
  return {
    miljo: "PROD",
    baseUrl: "https://www.nav.no",
    appUrl: "https://www.nav.no/person/tilbakemeldinger",
    apiUrl: "https://www.nav.no/person/tilbakemeldinger-api",
    tjenesteUrl: "https://tjenester.nav.no",
    loginUrl: "https://loginservice.nav.no/login",
    logoutUrl: "https://loginservice.nav.no/slo"
  };
};

export default Environment;
