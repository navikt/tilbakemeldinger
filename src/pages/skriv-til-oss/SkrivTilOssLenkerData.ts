import { urls } from "../../Config";
import { STOTema } from "../../types/skrivtiloss";
import { TemaLenkepanelData } from "../../types/lenker";

// TODO: data i sanity for disse
export const hjelpemidlerLenkepaneler: TemaLenkepanelData[] = [
  {
    tema: STOTema.HjelpemidlerGenerelt,
    grafanaId: "hjelpemidler.generelt",
    tittelFallbackId: "skrivtiloss.hjelpemidler.generelt.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.generelt,
    externalUrl: true
  },
  {
    tema: STOTema.HjelpemidlerOrtopedisk,
    grafanaId: "hjelpemidler.ortopediske",
    tittelFallbackId: "skrivtiloss.hjelpemidler.ortopediske.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
    externalUrl: true
  },
  {
    tema: STOTema.HjelpemidlerBil,
    grafanaId: "hjelpemidler.bil",
    tittelFallbackId: "skrivtiloss.hjelpemidler.bil.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.bil,
    externalUrl: true
  }
];

export const skrivTilOssLenkepaneler: TemaLenkepanelData[] = [
  {
    tema: STOTema.Jobbsoker,
    tittelFallbackId: "skrivtiloss.arbeidssoker.lenke.tittel",
    grafanaId: "skrivtiloss.arbeidssoker",
    url: urls.skrivTilOss.arbeidssoker,
    externalUrl: true
  },
  {
    tema: STOTema.Syk,
    tittelFallbackId: "skrivtiloss.syk.lenke.tittel",
    grafanaId: "skrivtiloss.syk",
    url: urls.skrivTilOss.syk,
    externalUrl: true
  },
  {
    tema: STOTema.Familie,
    tittelFallbackId: "skrivtiloss.familieogbarn.lenke.tittel",
    grafanaId: "skrivtiloss.familieogbarn",
    url: urls.skrivTilOss.familieogbarn,
    externalUrl: true
  },
  {
    tema: STOTema.Ufor,
    tittelFallbackId: "skrivtiloss.ufor.lenke.tittel",
    grafanaId: "skrivtiloss.ufor",
    url: urls.skrivTilOss.ufor,
    externalUrl: true
  },
  {
    tema: STOTema.Pensjon,
    tittelFallbackId: "skrivtiloss.pensjonist.lenke.tittel",
    grafanaId: "skrivtiloss.pensjonist",
    url: urls.skrivTilOss.pensjonist,
    externalUrl: true
  },
  {
    tema: STOTema.Hjelpemidler,
    tittelFallbackId: "skrivtiloss.hjelpemidler.lenke.tittel",
    grafanaId: "skrivtiloss.hjelpemidler",
    url: urls.skrivTilOss.hjelpemidler,
  }
];
