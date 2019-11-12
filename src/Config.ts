import Environment from "./Environments";
import { ChatTema } from "./types/chat";

const { tjenesteUrl, appUrl, baseAppPath } = Environment();
const navUrl = Environment().baseUrl;

export const varsler = [
  {
    tittel: "Feiltolkning av EØS-reglene",
    beskrivelse:
      "Her finner du informasjon knyttet til feil tolkning og praktisering av EØS-reglene for mottakere av arbeidsavklaringspenger, sykepenger og pleiepenger.",
    lenke:
      "https://www.nav.no/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Feiltolkning+av+E%C3%98S-reglene",
    lenkeTekst: "Les mer"
  }
];

export const urls = {
  baseAppPath: baseAppPath,
  appUrl: appUrl,
  forside: "/person/kontakt-oss",
  tilbakemeldinger: {
    forside: `${baseAppPath}/tilbakemeldinger`,
    klagepavedtak: `${navUrl}/soknader/nb/klage`,
    serviceklage: {
      form: `${baseAppPath}/tilbakemeldinger/serviceklage`,
      login: `${baseAppPath}/tilbakemeldinger/serviceklage/login`
    },
    feilogmangler: `${baseAppPath}/tilbakemeldinger/feil-og-mangler`,
    rostilnav: `${baseAppPath}/tilbakemeldinger/ros-til-nav`
  },
  samegiella: {
    base: `${baseAppPath}/samegiella`,
    redirect: `${navUrl}/se/Samegiella`,
    samtale: `${baseAppPath}/samegiella/bestilling-av-samtale`
  },
  skrivTilOss: {
    forside: `${baseAppPath}/skriv-til-oss`,
    arbeidssoker: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    familieogbarn: `${tjenesteUrl}/mininnboks/sporsmal/skriv/FMLI`,
    pensjonist: `${tjenesteUrl}/mininnboks/sporsmal/skriv/PENS`,
    syk: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    hjelpemidler: `${baseAppPath}/skriv-til-oss/hjelpemidler`,
    ufor: `${tjenesteUrl}/mininnboks/sporsmal/skriv/UFRT`,
    temaHjelpemidler: {
      generelt: `${tjenesteUrl}/mininnboks/sporsmal/skriv/HJLPM`,
      ortopediske: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ORT_HJE`,
      bil: `${tjenesteUrl}/mininnboks/sporsmal/skriv/BIL`
    }
  },
  chat: {
    forside: `${baseAppPath}/chat`,
    sosialhjelp: `${navUrl}/no/Person/Flere+tema/Sosiale+tjenester/Relatert+innhold/chatside-sosialetjenester`,
    okonomi: `${navUrl}/no/Person/Flere+tema/Sosiale+tjenester/Relatert+innhold/chatside-gjeldsradgivning`
  },
  chatBotApi: {
    sessionConfig: "https://api.puzzel.com/chat/v1/sessions"
  },
  facebook: {
    foreldrepenger: "https://www.facebook.com/navforeldrepenger",
    jobblyst: "https://www.facebook.com/navjobblyst"
  },
  samtykke: `${navUrl}/no/NAV+og+samfunn/Om+NAV/Relatert+informasjon/taushetsplikt-og-samtykke`,
  fullmaktskjema: `${navUrl}/soknader/nb/person/diverse/fullmaktskjema`,
  aktivitetsplan: `${tjenesteUrl}/aktivitetsplan/`,
  faq: {
    utbetalinger: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Utbetalinger/Utbetalinger`,
    utbetalingsoversikt: `${tjenesteUrl}/utbetalingsoversikt/`,
    saksbehandlingstider: `${navUrl}/no/NAV+og+samfunn/Om+NAV/Saksbehandlingstider+i+NAV`,
    endreKontonummer: `${navUrl}/person/personopplysninger#utbetaling`,
    saksoversikt: `${tjenesteUrl}/saksoversikt/`,
    postTilAnnenAdresse: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/vil-du-ha-post-fra-nav-til-en-annen-adresse`,
    eosReglerSak: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Feiltolkning+av+E%C3%98S-reglene`
  },
  veteraner: `${navUrl}/veteraner`,
  arbeidssoker: `${tjenesteUrl}/veiledearbeidssoker/mistet-jobben/registrering-arbeidssoker`,
  tolketjenesten: `${navUrl}/no/Person/Hjelpemidler/Tjenester+og+produkter/Tolketjenesten`,
  spraktolk: `${navUrl}/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Oppfolging+fra+NAV/trenger-du-spr%C3%A5ktolk`,
  finnDittNavKontor: `${navUrl}/person/personopplysninger#ditt-nav-kontor`,
  gamleKontaktOss: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss`,
  sosialeMedier: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`,
  chatMedNav: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/chat-med-nav`,
  tekniskBrukerstotte: {
    selvhjelp: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749`,
    ring: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/kontakt-teknisk-brukerst%C3%B8tte-nav.no`
  },
  presseKontakt: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Presse/Pressekontakt`
};

export const vars = {
  svartidDager: 2,
  maksLengdeMelding: 10000,
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
      [ChatTema.Okonomi]: ""
    }
  }
};
