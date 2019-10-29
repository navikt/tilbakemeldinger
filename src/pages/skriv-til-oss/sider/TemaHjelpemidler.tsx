import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

const tittel: string = "hjelpemidler.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id={"hjelpemidler.infotekst"}/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "hjelpemidler.lenke.generelt.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.generelt.ingress"}/>,
    url: urls.temaHjelpemidler.generelt,
    external: false
  },
  {
    tittel: "hjelpemidler.lenke.skrivtiloss.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.skrivtiloss.ingress"}/>,
    url: urls.temaHjelpemidler.skrivtiloss,
    external: false
  },
  {
    tittel: "hjelpemidler.lenke.bil.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.bil.ingress"}/>,
    url: urls.temaHjelpemidler.bil,
    external: false
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
