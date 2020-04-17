import Environment from "./Environments";
import { useStore } from "./providers/Provider";
import { localePath } from "./utils/locale";

export const forsidePath = "/person/kontakt-oss";
const { tjenesteUrl, baseAppPath } = Environment();
const navUrl = Environment().baseUrl;

export const useLocalePaths = () => {
  const [{ locale }] = useStore();
  const locPath = (path: string) => localePath(path, locale);

  // TODO: få dette til å virke med type-checks
  // type ObjType = {[key: string]: object | string};
  //
  // const setLocalePaths = (paths: ObjType): ObjType =>
  //   Object.entries(paths).reduce((acc, [key, value]) =>
  //     ({...acc, key: typeof value === "object" ? setLocalePaths(value as ObjType) : locPath(value)}), {});
  //
  // return setLocalePaths(paths);

  return {
    baseAppPath: `${paths.baseAppPath}/${locale}`,
    chat: {
      forside: locPath(paths.chat.forside),
      arbeidsgiver: locPath(paths.chat.arbeidsgiver),
      jobbsoker: locPath(paths.chat.jobbsoker),
      syk: locPath(paths.chat.syk),
      familie: locPath(paths.chat.familie),
      ufor: locPath(paths.chat.ufor),
      sosialhjelp: locPath(paths.chat.sosialhjelp),
      okonomi: locPath(paths.chat.okonomi),
      eures: locPath(paths.chat.eures),
    },
    skrivTilOss: {
      forside: locPath(paths.skrivTilOss.forside),
      hjelpemidler: locPath(paths.skrivTilOss.hjelpemidler),
    },
    finnDittNavKontorUinnlogget: locPath(paths.finnDittNavKontorUinnlogget),
    tilbakemeldinger: {
      forside: locPath(paths.tilbakemeldinger.forside),
      serviceklage: {
        form: locPath(paths.tilbakemeldinger.serviceklage.form),
        login: locPath(paths.tilbakemeldinger.serviceklage.login),
      },
      feilogmangler: locPath(paths.tilbakemeldinger.feilogmangler),
      rostilnav: locPath(paths.tilbakemeldinger.rostilnav)
    },
    samegiella: {
      base: locPath(paths.samegiella.base),
      samtale: locPath(paths.samegiella.samtale)
    }
  };
};

export const paths = {
  baseAppPath: baseAppPath,
  chat: {
    forside: "/chat",
    arbeidsgiver: "/chat/arbeidsgiver",
    jobbsoker: "/chat/jobbsoker",
    syk: "/chat/syk",
    familie: "/chat/familie",
    ufor: "/chat/ufor",
    sosialhjelp: "/chat/sosialhjelp",
    okonomi: "/chat/okonomi",
    eures: "/chat/eures"
  },
  skrivTilOss: {
    forside: "/skriv-til-oss",
    hjelpemidler: "/skriv-til-oss/hjelpemidler",
  },
  finnDittNavKontorUinnlogget: "/finnkontor",
  tilbakemeldinger: {
    forside: "/tilbakemeldinger",
    serviceklage: {
      form: "/tilbakemeldinger/serviceklage",
      login: "/tilbakemeldinger/serviceklage/login",
    },
    feilogmangler: "/tilbakemeldinger/feil-og-mangler",
    rostilnav: "/tilbakemeldinger/ros-til-nav"
  },
  samegiella: {
    base: "/samegiella",
    samtale: "/samegiella/bestilling-av-samtale"
  }
};

export const urls = {
  chatEures: "https://ec.europa.eu/eures/main.jsp?acro=eures&lang=no&catId=10821&parentCategory=10821",
  ringOss: {
    nb: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-nav-pa-telefon2`,
    en: `${navUrl}/en/home/about-nav/contact-us`
  },
  faqDefault: {
    utbetalingsoversikt: `${tjenesteUrl}/utbetalingsoversikt/`,
    saksoversikt: `${tjenesteUrl}/saksoversikt/`,
    utbetalinger: `${navUrl}/no/nav-og-samfunn/kontakt-nav/utbetalinger`,
    saksbehandlingstider: `${navUrl}/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav`,
    endreKontonummer: `${navUrl}/person/personopplysninger#utbetaling`,
    postTilAnnenAdresse: `${navUrl}/no/nav-og-samfunn/kontakt-nav/vil-du-ha-post-fra-nav-til-en-annen-adresse2`,
  },
  kontaktVeileder: `https://aktivitetsplan.nav.no/dialog`,
  skrivTilOss: {
    jobbsoker: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    syk: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    familieogbarn: `${tjenesteUrl}/mininnboks/sporsmal/skriv/FMLI`,
    ufor: `${tjenesteUrl}/mininnboks/sporsmal/skriv/UFRT`,
    pensjonist: `${tjenesteUrl}/mininnboks/sporsmal/skriv/PENS`,
    sosialhjelp: `${tjenesteUrl}/mininnboks/sporsmal/skriv/OKSOS`,
    hjelpemidler: "/skriv-til-oss/hjelpemidler",
    temaHjelpemidler: {
      generelt: `${tjenesteUrl}/mininnboks/sporsmal/skriv/HJLPM`,
      ortopediske: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ORT_HJE`,
      bil: `${tjenesteUrl}/mininnboks/sporsmal/skriv/BIL`
    }
  },
  facebook: {
    foreldrepenger: "https://www.facebook.com/navforeldrepenger",
    jobblyst: "https://www.facebook.com/navjobblyst"
  },
  finnNavKontor: {
    finnDittNavKontor: `${navUrl}/person/personopplysninger#ditt-nav-kontor`,
    finnDinHjelpemiddelsentral: `${navUrl}/no/person/hjelpemidler/tjenester-og-produkter/hjelpemidler/kontakt-hjelpemiddelsentralen`,
    navKontorUrlPrefix: `https://www.nav.no/no/nav-og-samfunn/kontakt-nav/kontorer/`,
  },
  tolkeTjenesten: {
    tolketjenesten: `${navUrl}/no/person/hjelpemidler/tjenester-og-produkter/tolketjenesten`,
    spraktolk: {
      nb: `${navUrl}/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/oppfolging-fra-nav/trenger-du-språktolk`,
      en: `${navUrl}/en/home/benefits-and-services/relatert-informasjon/do-you-need-an-interpreter`
    },
  },
  tilbakemeldinger: {
    klagepavedtak: {
      nb: `${navUrl}/soknader/nb/klage`,
      en: `${navUrl}/soknader/en/klage/person`
    },
    klagerettigheter: `${navUrl}/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter`,
    serviceklage: {
      fullmaktskjema: `${navUrl}/soknader/nb/person/diverse/fullmaktskjema`,
      saksbehandlingstider: `${navUrl}/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav`,
      saksoversikt: `${tjenesteUrl}/saksoversikt/`
    },
  },
  samegiella: {
    redirect: `${navUrl}/se/Samegiella`,
  },
  tekniskBrukerstotte: {
    selvhjelp: `${navUrl}/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/hjelp-til-personbruker`,
    ring: `${navUrl}/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no`
  },
  presseKontakt: `${navUrl}/no/nav-og-samfunn/kontakt-nav/presse/pressekontakt`,
  sosialeMedier: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-nav-pa-facebook-eller-twitter`,

  //
  // Midlertidige url'er
  //
  koronaVarsel: `${navUrl}/person/koronaveiviser`,
  koronaVarselDialog: `${navUrl}/no/person/innhold-til-person-forside/nyttig-a-vite/koronavirus--informasjon-fra-nav/dialog-med-nav-i-forbindelse-med-koronaviruset`
};

export const vars = {
  defaultDatoTidFormat: "HH:mm DD-MM-YYYY",
  defaultDatoFormat: "DD-MM-YYYY",
  maksLengdeMelding: 10000,
};

export default {
  urls,
  paths,
  vars,
  forsidePath,
  useLocalePaths
};
