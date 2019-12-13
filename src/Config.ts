import Environment from "./Environments";
import { Ukedager } from "./types/datotid";
import { ChatTema } from "./types/chat";

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
    klagerettigheter: `${navUrl}/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter`,
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
      temaside: `${baseAppPath}/chat/sosialhjelp`
    },
    okonomi: {
      temaside: `${baseAppPath}/chat/okonomi`
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
  samtykke: `${navUrl}/no/nav-og-samfunn/om-nav/relatert-informasjon/taushetsplikt-og-samtykke`,
  fullmaktskjema: `${navUrl}/soknader/nb/person/diverse/fullmaktskjema`,
  aktivitetsplan: `${tjenesteUrl}/aktivitetsplan/`,
  aktivitetsplanDialog: `https://aktivitetsplan.nav.no/dialog`,
  faq: {
    utbetalinger: `${navUrl}/no/nav-og-samfunn/kontakt-nav/utbetalinger`,
    utbetalingsoversikt: `${tjenesteUrl}/utbetalingsoversikt/`,
    saksbehandlingstider: `${navUrl}/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav`,
    endreKontonummer: `${navUrl}/person/personopplysninger#utbetaling`,
    saksoversikt: `${tjenesteUrl}/saksoversikt/`,
    postTilAnnenAdresse: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-oss_2/vil-du-ha-post-fra-nav-til-en-annen-adresse2`,
    eosReglerSak: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-oss_2/feiltolkning-av-eos-reglene`
  },
  veteraner: `${navUrl}/veteraner`,
  ringOss: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-oss_2/kontakt-nav-pa-telefon2`,
  arbeidssoker: `${tjenesteUrl}/veiledearbeidssoker/mistet-jobben/registrering-arbeidssoker`,
  tolketjenesten: `${navUrl}/no/person/hjelpemidler/tjenester-og-produkter/tolketjenesten`,
  spraktolk: `${navUrl}/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/oppfolging-fra-nav/trenger-du-språktolk`,
  finnDittNavKontor: `${navUrl}/person/personopplysninger#ditt-nav-kontor`,
  finnDinHjelpemiddelsentral: `${navUrl}/no/person/hjelpemidler/tjenester-og-produkter/hjelpemidler/kontakt-hjelpemiddelsentralen`,
  sosialeMedier: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-oss_2/kontakt-nav-på-chat-facebook-og-twitter/kontakt-nav-pa-facebook-eller-twitter`,
  tekniskBrukerstotte: {
    selvhjelp: `${navUrl}/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/hjelp-til-personbruker`,
    ring: `${navUrl}/no/nav-og-samfunn/kontakt-nav/relatert-informasjon/kontakt-teknisk-brukerstotte-nav.no`
  },
  presseKontakt: `${navUrl}/no/nav-og-samfunn/kontakt-nav/presse/pressekontakt`
};

export const vars = {
  maksLengdeMelding: 10000,
  svartid: {
    skrivTilOss: 3,
    kontaktVeileder: 2,
  },
  unleash: {
    timeout: 3000,
    skrivTilOssEnabledDefault: true,
    skrivTilOssEnabledName: "kontakt-oss.skriv-til-oss",
    langSvartidDefault: false,
    langSvartidName: "kontakt-oss.skriv-til-oss.lang-svartid",
    tekniskProblemDefault: false,
    tekniskProblemFeatureName: "kontakt-oss.teknisk-problem",
    redirectDefault: false,
    redirectName: "kontakt-oss.redirect",
    testBrukerDefault: true,
    testBrukerFeatureName: "kontakt-oss.test-pool",
    abGruppeDefault: true,
    abGruppeFeatureName: "kontakt-oss.ab",
  },
  chatBot: {
    customerKey: "41155",
    storageKeys: {
      config: "chatbot-frida_config",
      openState: "chatbot-frida_apen",
      history: "chatbot-frida_historie",
      mailTimeout: "chatbot-frida_mail-timeout",
    },
    temaConfigs: {
      [ChatTema.Familie]: {
        configId: "c3372a51-6434-4770-a0aa-6e4edba3471e",
        queueKey: "Q_CHAT_BOT",
      },
      [ChatTema.AAP]: {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_BOT",
      },
      [ChatTema.Jobbsoker]: {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_AAP",
      },
      [ChatTema.Sosial]: {
        configId: "6564b567-b70b-48e1-b2c5-957c0bc624de",
        queueKey: "Q_CHAT_BOT",
      },
      [ChatTema.Okonomi]: {
        configId: "599f9e7c-7f6b-4569-81a1-27202c419953",
        queueKey: "Q_CHAT_GJELDSRADGIVNING",
      },
      [ChatTema.EURES]: null,
    },
    apningsTider: {
      jobbsoker: {
        [Ukedager.Mandag]: {
          start: "09:00",
          end: "14:30",
        },
        [Ukedager.Tirsdag]: {
          start: "09:00",
          end: "14:30",
        },
        [Ukedager.Onsdag]: {
          start: "09:00",
          end: "14:30",
        },
        [Ukedager.Torsdag]: {
          start: "09:00",
          end: "14:30",
        },
        [Ukedager.Fredag]: {
          start: "09:00",
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
          end: "11:00",   // TODO: sett tilbake til 15:00 etter 18.12
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
      "26-12-2019",
      "01-01-2020",
    ]),
  }
};
