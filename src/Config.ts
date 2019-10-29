import Environment from "./Environments";
import { ChatTema } from "./types/chat";

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
    hjelpemidler: `${baseUrl}/skriv-til-oss/hjelpemidler`,
    ufor: "#",
    sosial: "#",
  },
  chat: {
    forside: `${baseUrl}/chat`,
    familie: `${baseUrl}/chat/familie`,
    aap: `${baseUrl}/chat/aap`,
    sosialhjelp: `${baseUrl}/chat/sosialhjelp`,
    okonomi: `${baseUrl}/chat/okonomi`,
  },
  chatBotApi: {
    sessionConfig: "https://api.puzzel.com/chat/v1/sessions",
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
    bil: "#",
    tolk: "#",
  },
  aktivitetsplan: `${tjenesteUrl}/aktivitetsplan/`,
  faq: {
    utbetalinger: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger`,
    utbetalingsoversikt: `${tjenesteUrl}/utbetalingsoversikt/`,
    saksbehandlingstider: `${navUrl}/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV`,
    endreKontonummer: `${navUrl}/person/personopplysninger`,
    saksoversikt: `${tjenesteUrl}/saksoversikt/`,
    postTilAnnenAdresse: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/vil-du-ha-post-fra-nav-til-en-annen-adresse`
  },
  veteraner: `${navUrl}/veteraner`,
  arbeidssoker: `${tjenesteUrl}/veiledearbeidssoker/mistet-jobben/registrering-arbeidssoker`,
  tolketjenesten: `${navUrl}/no/Person/Hjelpemidler/Tjenester+og+produkter/Tolketjenesten`,
  spraktolk: `${navUrl}/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Oppfolging+fra+NAV/trenger-du-spr%C3%A5ktolk`,
  finnDittNavKontor: `${navUrl}/person/personopplysninger`,
  gamleKontaktOss: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss`,
  sosialeMedier: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`,
  chatMedNav: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/chat-med-nav`,
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
  },
  chatBot: {
    queueKeyBot: "Q_CHAT_BOT",
    queueKeyHuman: "Q_CHAT_AGENT",
    customerKey: "41155",
    configIds: {
      [ChatTema.AAP]: "7f6b-4569-81a1-27202c419953",
      [ChatTema.Familie]: "c3372a51-6434-4770-a0aa-6e4edba3471e",
      [ChatTema.Sosial]: "",
      [ChatTema.Okonomi]: "",
    }
  }
};
