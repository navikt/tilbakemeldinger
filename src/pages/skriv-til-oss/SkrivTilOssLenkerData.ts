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
  },
  {
    tema: STOTema.HjelpemidlerOrtopedisk,
    grafanaId: "hjelpemidler.ortopediske",
    tittelFallbackId: "skrivtiloss.hjelpemidler.ortopediske.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
  },
  {
    tema: STOTema.HjelpemidlerBil,
    grafanaId: "hjelpemidler.bil",
    tittelFallbackId: "skrivtiloss.hjelpemidler.bil.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.bil,
  }
];

export const skrivTilOssLenkepaneler: TemaLenkepanelData[] = [
  {
    tema: STOTema.Jobbsoker,
    tittelFallbackId: "skrivtiloss.arbeidssoker.lenke.tittel",
    grafanaId: "skrivtiloss.arbeidssoker",
    url: urls.skrivTilOss.arbeidssoker,
  },
  {
    tema: STOTema.Syk,
    tittelFallbackId: "skrivtiloss.syk.lenke.tittel",
    grafanaId: "skrivtiloss.syk",
    url: urls.skrivTilOss.syk,
  },
  {
    tema: STOTema.Familie,
    tittelFallbackId: "skrivtiloss.familieogbarn.lenke.tittel",
    grafanaId: "skrivtiloss.familieogbarn",
    url: urls.skrivTilOss.familieogbarn,
  },
  {
    tema: STOTema.Ufor,
    tittelFallbackId: "skrivtiloss.ufor.lenke.tittel",
    grafanaId: "skrivtiloss.ufor",
    url: urls.skrivTilOss.ufor,
  },
  {
    tema: STOTema.Pensjon,
    tittelFallbackId: "skrivtiloss.pensjonist.lenke.tittel",
    grafanaId: "skrivtiloss.pensjonist",
    url: urls.skrivTilOss.pensjonist,
  },
  {
    tema: STOTema.Hjelpemidler,
    tittelFallbackId: "skrivtiloss.hjelpemidler.lenke.tittel",
    grafanaId: "skrivtiloss.hjelpemidler",
    url: urls.skrivTilOss.hjelpemidler,
    harUndertemaer: true
  }
];