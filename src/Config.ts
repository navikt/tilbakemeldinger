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
    skrivTilOss: {
      forside: locPath(paths.skrivTilOss.forside),
    },
    tilbakemeldinger: {
      forside: locPath(paths.tilbakemeldinger.forside),
      serviceklage: locPath(paths.tilbakemeldinger.serviceklage),
      feilogmangler: locPath(paths.tilbakemeldinger.feilogmangler),
      rostilnav: locPath(paths.tilbakemeldinger.rostilnav),
    },
  };
};

export const paths = {
  baseAppPath: baseAppPath,
  skrivTilOss: {
    forside: "/skriv-til-oss",
  },
  tilbakemeldinger: {
    forside: "/tilbakemeldinger",
    serviceklage: "/tilbakemeldinger/serviceklage",
    feilogmangler: "/tilbakemeldinger/feil-og-mangler",
    rostilnav: "/tilbakemeldinger/ros-til-nav",
  },
};

export const urls = {
  kontaktOssForside: `${navUrl}${forsidePath}`,
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
