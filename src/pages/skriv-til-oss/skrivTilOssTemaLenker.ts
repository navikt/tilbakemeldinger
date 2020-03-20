import { urls } from "../../Config";
import { STOTema, TemaLenke } from "../../types/kanaler";

// TODO: data i sanity for disse
export const hjelpemidlerLenkepaneler: TemaLenke[] = [
  {
    tema: STOTema.HjelpemidlerGenerelt,
    grafanaId: "hjelpemidler.generelt",
    tittelId: "skrivtiloss.hjelpemidler.generelt.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.generelt,
    externalUrl: true
  },
  {
    tema: STOTema.HjelpemidlerOrtopedisk,
    grafanaId: "hjelpemidler.ortopediske",
    tittelId: "skrivtiloss.hjelpemidler.ortopediske.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
    externalUrl: true
  },
  {
    tema: STOTema.HjelpemidlerBil,
    grafanaId: "hjelpemidler.bil",
    tittelId: "skrivtiloss.hjelpemidler.bil.lenke.tittel",
    url: urls.skrivTilOss.temaHjelpemidler.bil,
    externalUrl: true
  }
];

export const skrivTilOssLenkepaneler: TemaLenke[] = [
  {
    tema: STOTema.Jobbsoker,
    tittelId: "skrivtiloss.arbeidssoker.lenke.tittel",
    grafanaId: "skrivtiloss.arbeidssoker",
    url: urls.skrivTilOss.jobbsoker,
    externalUrl: true
  },
  {
    tema: STOTema.Syk,
    tittelId: "skrivtiloss.syk.lenke.tittel",
    grafanaId: "skrivtiloss.syk",
    url: urls.skrivTilOss.syk,
    externalUrl: true
  },
  {
    tema: STOTema.Familie,
    tittelId: "skrivtiloss.familieogbarn.lenke.tittel",
    grafanaId: "skrivtiloss.familieogbarn",
    url: urls.skrivTilOss.familieogbarn,
    externalUrl: true
  },
  {
    tema: STOTema.Ufor,
    tittelId: "skrivtiloss.ufor.lenke.tittel",
    grafanaId: "skrivtiloss.ufor",
    url: urls.skrivTilOss.ufor,
    externalUrl: true
  },
  {
    tema: STOTema.Pensjon,
    tittelId: "skrivtiloss.pensjonist.lenke.tittel",
    grafanaId: "skrivtiloss.pensjonist",
    url: urls.skrivTilOss.pensjonist,
    externalUrl: true
  },
  {
    tema: STOTema.Sosial,
    tittelId: "skrivtiloss.sosial.lenke.tittel",
    grafanaId: "skrivtiloss.sosial",
    url: urls.skrivTilOss.sosialhjelp,
    externalUrl: true
  },
  {
    tema: STOTema.Hjelpemidler,
    tittelId: "skrivtiloss.hjelpemidler.lenke.tittel",
    grafanaId: "skrivtiloss.hjelpemidler",
    url: urls.skrivTilOss.hjelpemidler,
  }
];
