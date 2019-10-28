import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import { LenkepanelData } from "../SkrivTilOssLenkepanel";

const tittel: string = "skrivtiloss.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id="skrivtiloss.ingress"/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.arbeidssoker.lenke.tittel",
    ingress: "skrivtiloss.arbeidssoker.lenke.ingress",
    url: urls.skrivTilOss.arbeidssoker,
    lenkeTekst: "skrivtiloss.arbeidssoker.lenke.tittel",
  },
  {
    tittel: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: "skrivtiloss.familieogbarn.lenke.ingress",
    url: urls.skrivTilOss.familieogbarn,
    lenkeTekst: "skrivtiloss.familieogbarn.lenke.tittel",
  },
  {
    tittel: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: "skrivtiloss.pensjonist.lenke.ingress",
    url: urls.skrivTilOss.pensjonist,
    lenkeTekst: "skrivtiloss.pensjonist.lenke.tittel",
    external: true
  },
  {
    tittel: "skrivtiloss.syk.lenke.tittel",
    ingress: "skrivtiloss.syk.lenke.ingress",
    url: urls.skrivTilOss.syk,
    lenkeTekst: "skrivtiloss.syk.lenke.tittel",
    external: true
  },
  {
    tittel: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: "skrivtiloss.hjelpemidler.lenke.ingress",
    url: urls.skrivTilOss.hjelpemidler,
    lenkeTekst: "skrivtiloss.hjelpemidler.lenke.tittel",
  },
];

const SkrivTilOssForside = () => (
  <SkrivTilOssBase
    tittel={tittel}
    ingress={ingress}
    lenker={lenker}
  />
);

export default SkrivTilOssForside;
