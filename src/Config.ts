import Environment from "./Environments";
import { useStore } from "./providers/Provider";
import { localePath } from "./utils/locale";

export const forsidePath = "/person/kontakt-oss";
const { tjenesteUrl, baseAppPath } = Environment();
const navUrl = Environment().baseUrl;

export const useLocalePaths = () => {
  const [{ locale }] = useStore();
  const locPath = (path: string) => localePath(path, locale);

  return {
    baseAppPath: `${paths.baseAppPath}/${locale}`,
    chat: {
      forside: locPath(paths.chat.forside),
    },
    skrivTilOss: {
      forside: locPath(paths.skrivTilOss.forside),
    },
    finnDittNavKontorUinnlogget: locPath(paths.finnDittNavKontorUinnlogget),
    tilbakemeldinger: {
      forside: locPath(paths.tilbakemeldinger.forside),
      serviceklage: {
        form: locPath(paths.tilbakemeldinger.serviceklage.form),
        login: locPath(paths.tilbakemeldinger.serviceklage.login),
      },
      feilogmangler: locPath(paths.tilbakemeldinger.feilogmangler),
      rostilnav: locPath(paths.tilbakemeldinger.rostilnav),
    },
    samegiella: {
      base: locPath(paths.samegiella.base),
      samtale: locPath(paths.samegiella.samtale),
    },
  };
};

export const paths = {
  baseAppPath: baseAppPath,
  chat: {
    forside: "/chat",
  },
  skrivTilOss: {
    forside: "/skriv-til-oss",
  },
  finnDittNavKontorUinnlogget: "/finnkontor",
  tilbakemeldinger: {
    forside: "/tilbakemeldinger",
    serviceklage: {
      form: "/tilbakemeldinger/serviceklage",
      login: "/tilbakemeldinger/serviceklage/login",
    },
    feilogmangler: "/tilbakemeldinger/feil-og-mangler",
    rostilnav: "/tilbakemeldinger/ros-til-nav",
  },
  samegiella: {
    base: "/samegiella",
    samtale: "/samegiella/bestilling-av-samtale",
  },
};

export const urls = {
  kontaktOssForside: `${navUrl}${forsidePath}`,
  finnNavKontor: {
    navKontorUrlPrefix: `https://www.nav.no/no/nav-og-samfunn/kontakt-nav/kontorer/`,
  },
  tilbakemeldinger: {
    klagepavedtak: "https://klage.nav.no",
    klagerettigheter: {
      nb: `${navUrl}/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter`,
      en: `${navUrl}/en/home/rules-and-regulations/appeals`,
    },
    serviceklage: {
      dittNav: `${navUrl}/person/dittnav`,
      fullmaktskjema: `${navUrl}/soknader/nb/person/diverse/fullmaktskjema`,
      saksbehandlingstider: `${navUrl}/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav`,
      saksoversikt: {
        nb: `${tjenesteUrl}/saksoversikt/?lang=nb`,
        en: `${tjenesteUrl}/saksoversikt/?lang=en`,
      },
    },
  },
  samegiella: {
    redirect: `${navUrl}/se/Samegiella`,
  },
};

export const vars = {
  maksLengdeMelding: 10000,
};

const Config = {
  urls,
  paths,
  vars,
  forsidePath,
  useLocalePaths,
};

export default Config;
