import Environment from "./Environments";
import { Ukedager } from "./types/datotid";

export const forsidePath = "/person/kontakt-oss";
export const noRedirectUrlSegment = "/test";

const { tjenesteUrl, baseAppPath } = Environment();
const navUrl = Environment().baseUrl;

interface Varsel {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
}

/* Viktige meldinger her */
export const varsler: Varsel[] = [];

export const urls = {
  baseAppPath: baseAppPath,
  tilbakemeldinger: {
    forside: `${baseAppPath}/tilbakemeldinger`,
    klagepavedtak: `${navUrl}/soknader/nb/klage`,
    klagerettigheter: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Klage+ris+og+ros/Klagerettigheter`,
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
    familie: {
      temaside: `${baseAppPath}/chat/familie`
    },
    jobbsoker: {
      temaside: `${baseAppPath}/chat/jobbsoker`
    },
    aap: {
      temaside: `${baseAppPath}/chat/aap`
    },
    sosialhjelp: {
      temaside: `${baseAppPath}/chat/sosialhjelp`,
      chat: `${navUrl}/no/Person/Flere+tema/Sosiale+tjenester/Relatert+innhold/chatside-sosialetjenester`
    },
    okonomi: {
      temaside: `${baseAppPath}/chat/okonomi`,
      chat: `${navUrl}/no/Person/Flere+tema/Sosiale+tjenester/Relatert+innhold/chatside-gjeldsradgivning`
    },
    eures: {
      temaside: `${baseAppPath}/chat/eures`,
      chat:
        "https://ec.europa.eu/eures/main.jsp?acro=eures&lang=no&catId=10821&parentCategory=10821"
    }
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
  ringOss: `${navUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/kontakt-nav-p%C3%A5-telefon`,
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
    tekniskProblemName: "kontakt-oss.teknisk-problem",
    redirectDefault: false,
    redirectName: "kontakt-oss.redirect",
  },
  chatBot: {
    customerKey: "41155",
    queueKeys: {
      familie: "Q_CHAT_BOT",
      familieVeileder: "Q_CHAT_FAMILIEYTELSER",
      aap: "Q_CHAT_BOT",
      jobbsoker: "Q_CHAT_AAP",
      sosial: "Q_CHAT_SOSIALE_TJENESTER",
      okonomi: "Q_CHAT_GJELDSRADGIVNING",
    },
    configIds: {
      familie: "c3372a51-6434-4770-a0aa-6e4edba3471e",
      aap: "599f9e7c-7f6b-4569-81a1-27202c419953",
      jobbsoker: "599f9e7c-7f6b-4569-81a1-27202c419953",
      sosial: "599f9e7c-7f6b-4569-81a1-27202c419953",
      okonomi: "599f9e7c-7f6b-4569-81a1-27202c419953",
    },
    storageKeys: {
      config: "chatbot-frida_config",
      openState: "chatbot-frida_apen",
      history: "chatbot-frida_historie"
    },
    apningsTider: {
      jobbsoker: {
        [Ukedager.Mandag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Tirsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Onsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Torsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Fredag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Lordag]: null,
        [Ukedager.Sondag]: null,
      },
      sosial: {
        [Ukedager.Mandag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Tirsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Onsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Torsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Fredag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Lordag]: null,
        [Ukedager.Sondag]: null,
      },
      okonomi: {
        [Ukedager.Mandag]: {
          start: "10:00",
          end: "15:00",
        },
        [Ukedager.Tirsdag]: {
          start: "10:00",
          end: "15:00",
        },
        [Ukedager.Onsdag]: {
          start: "10:00",
          end: "15:00",
        },
        [Ukedager.Torsdag]: {
          start: "10:00",
          end: "14:30",
        },
        [Ukedager.Fredag]: {
          start: "10:00",
          end: "15:00",
        },
        [Ukedager.Lordag]: null,
        [Ukedager.Sondag]: null,
      },
    },
    stengteDager: new Set<string>([
      "25-12-2019",
      "01-01-2020",
    ]),
    oldChatbotCookieName: "intelecomchat_41155",
  }
};
