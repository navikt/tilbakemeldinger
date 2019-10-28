import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import { LenkepanelData } from "../SkrivTilOssLenkepanel";

const tittel: string = "hjelpemidler.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id={"hjelpemidler.infotekst"}/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "hjelpemidler.lenke.generelt.tittel",
    ingress: "hjelpemidler.lenke.generelt.ingress",
    url: urls.temaHjelpemidler.generelt,
    lenkeTekst: "hjelpemidler.lenke.generelt.tittel",
  },
  {
    tittel: "hjelpemidler.lenke.skrivtiloss.tittel",
    ingress: "hjelpemidler.lenke.skrivtiloss.ingress",
    url: urls.temaHjelpemidler.skrivtiloss,
    lenkeTekst: "hjelpemidler.lenke.skrivtiloss.tittel",
  },
  {
    tittel: "hjelpemidler.lenke.bil.tittel",
    ingress: "hjelpemidler.lenke.bil.ingress",
    url: urls.temaHjelpemidler.bil,
    lenkeTekst: "hjelpemidler.lenke.bil.tittel",
  },
];

const TemaHjelpemidler = () => (
  <SkrivTilOssBase
    tittel={tittel}
    ingress={ingress}
    lenker={lenker}
  />
);

export default TemaHjelpemidler;
