import Environment from "./Environments";
export const baseUrl = "/person/kontakt-oss";
const navUrl = Environment().baseUrl;

export const urls = {
  baseUrl: baseUrl,
  forside: baseUrl,
  tilbakemeldinger: {
    forside: `${baseUrl}/tilbakemeldinger`,
    serviceklage: {
      form: `${baseUrl}/tilbakemeldinger/serviceklage`,
      login: `${baseUrl}/tilbakemeldinger/serviceklage/login`
    },
    feilogmangler: `${baseUrl}/tilbakemeldinger/feil-og-mangler`,
    rostilnav: `${baseUrl}/tilbakemeldinger/ros-til-nav`
  },
  samegiella: `${baseUrl}/samegiella/bestilling-av-samtale`,
  skrivTilOss: {
    forside: `${baseUrl}/skriv-til-oss`,
    arbeidssoker: `${baseUrl}/skriv-til-oss/arbeidssoker`,
    familieogbarn: `${baseUrl}/skriv-til-oss/familieogbarn`,
    pensjonist: "#",
    syk: "#",
    hjelpemidler: `${baseUrl}/skriv-til-oss/hjelpemidler`
  },
  facebook: "#",
  snapchat: "#",
  temaArbeidssoker: {
    veileder: "#",
    chat: "#",
    skrivtiloss: "#"
  },
  temaFamilieOgBarn: {
    chat: "#",
    skrivtiloss: "#"
  },
  temaHjelpemidler: {
    generelt: "#",
    skrivtiloss: "#",
    bil: "#"
  },
  sosialeMedier: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`
};

export const vars = {
  svartidDager: 2,
  unleash: {
    timeout: 3000,
    skrivTilOssEnabledDefault: true,
    skrivTilOssEnabledName: "kontakt-oss.skriv-til-oss",
    langSvartidDefault: false,
    langSvartidName: "kontakt-oss.skriv-til-oss.lang-svartid",
    tekniskProblemDefault: false,
    tekniskProblemName: "kontakt-oss.teknisk-problem"
  }
};
