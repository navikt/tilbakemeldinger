import Environment from "./Environments";
export const forsidePath = "/person/kontakt-oss";
const { tjenesteUrl, baseAppPath } = Environment();
const navUrl = Environment().baseUrl;

export const urls = {
  baseAppPath: baseAppPath,
  chat: {
    forside: `${baseAppPath}/chat`,
    arbeidsgiver: {
      temaside: `${baseAppPath}/chat/arbeidsgiver`
    },
    jobbsoker: {
      temaside: `${baseAppPath}/chat/jobbsoker`
    },
    syk: {
      temaside: `${baseAppPath}/chat/syk`
    },
    familie: {
      temaside: `${baseAppPath}/chat/familie`
    },
    ufor: {
      temaside: `${baseAppPath}/chat/ufor`
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
  ringOss: `${navUrl}/no/nav-og-samfunn/kontakt-nav/kontakt-nav-pa-telefon2`,
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
    forside: `${baseAppPath}/skriv-til-oss`,
    jobbsoker: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    syk: `${tjenesteUrl}/mininnboks/sporsmal/skriv/ARBD`,
    familieogbarn: `${tjenesteUrl}/mininnboks/sporsmal/skriv/FMLI`,
    ufor: `${tjenesteUrl}/mininnboks/sporsmal/skriv/UFRT`,
    pensjonist: `${tjenesteUrl}/mininnboks/sporsmal/skriv/PENS`,
    hjelpemidler: `${baseAppPath}/skriv-til-oss/hjelpemidler`,
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
    finnDittNavKontorUinnlogget: `${baseAppPath}/finnkontor`,
    navKontorUrlPrefix: `https://www.nav.no/no/nav-og-samfunn/kontakt-nav/kontorer/`,
  },
  tolkeTjenesten: {
    tolketjenesten: `${navUrl}/no/person/hjelpemidler/tjenester-og-produkter/tolketjenesten`,
    spraktolk: `${navUrl}/no/person/arbeid/oppfolging-og-tiltak-for-a-komme-i-jobb/oppfolging-fra-nav/trenger-du-språktolk`,
  },
  tilbakemeldinger: {
    forside: `${baseAppPath}/tilbakemeldinger`,
    klagepavedtak: `${navUrl}/soknader/nb/klage`,
    klagerettigheter: `${navUrl}/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter`,
    serviceklage: {
      form: `${baseAppPath}/tilbakemeldinger/serviceklage`,
      login: `${baseAppPath}/tilbakemeldinger/serviceklage/login`,
      fullmaktskjema: `${navUrl}/soknader/nb/person/diverse/fullmaktskjema`,
    },
    feilogmangler: `${baseAppPath}/tilbakemeldinger/feil-og-mangler`,
    rostilnav: `${baseAppPath}/tilbakemeldinger/ros-til-nav`
  },
  samegiella: {
    base: `${baseAppPath}/samegiella`,
    redirect: `${navUrl}/se/Samegiella`,
    samtale: `${baseAppPath}/samegiella/bestilling-av-samtale`
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
  koronaVarsel: `${navUrl}/no/person/innhold-til-person-forside/nyttig-a-vite/koronavirus--informasjon-fra-nav`,
  koronaVarselDialog: `${navUrl}/no/person/innhold-til-person-forside/nyttig-a-vite/koronavirus--informasjon-fra-nav/dialog-med-nav-i-forbindelse-med-koronaviruset`
};

export const vars = {
  defaultDatoTidFormat: "HH:mm DD-MM-YYYY",
  defaultDatoFormat: "DD-MM-YYYY",
  maksLengdeMelding: 10000,
};

export default {
  urls,
  vars,
  forsidePath
};
