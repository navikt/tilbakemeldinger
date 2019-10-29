import Environment from "./Environments";
export const baseUrl = "/person/kontakt-oss";
const { tjenesteUrl } = Environment();
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
  aktivitetsplan: `${tjenesteUrl}/aktivitetsplan/`,
  faq: {
    endreKontonummer: `${navUrl}/person/personopplysninger`,
    postTilAnnenAdresse: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/vil-du-ha-post-fra-nav-til-en-annen-adresse`
  },
  veteraner: `${navUrl}/veteraner`,
  arbeidssoker: `${tjenesteUrl}/veiledearbeidssoker/mistet-jobben/registrering-arbeidssoker`,
  tolketjenesten: `${navUrl}/no/Person/Hjelpemidler/Tjenester+og+produkter/Tolketjenesten`,
  spraktolk: `${navUrl}/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Oppfolging+fra+NAV/trenger-du-spr%C3%A5ktolk`,
  finnDittNavKontor: `${navUrl}/person/personopplysninger`,
  gamleKontaktOss: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss`,
  sosialeMedier: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`,
  chat: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/chat-med-nav`,
  tekniskBrukerstotte: {
    selvhjelp: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749`,
    ring: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/kontakt-teknisk-brukerst%C3%B8tte-nav.no`
  }
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
