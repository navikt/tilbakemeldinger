import React, { ReactNode } from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

const ingress: ReactNode = (
  <>
    <Normaltekst className="skriv-til-oss__svartid">
      <FormattedMessage id={"skrivtiloss.svartid"} values={{numDager: vars.svartidDager}}/>
    </Normaltekst>
    <Normaltekst className="skriv-til-oss__infotekst">
      <FormattedMessage id={"hjelpemidler.infotekst"}/>
    </Normaltekst>
  </>
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
    tittel={"hjelpemidler.tittel"}
    ingress={ingress}
    lenker={lenker}
  />
);

export default TemaHjelpemidler;
