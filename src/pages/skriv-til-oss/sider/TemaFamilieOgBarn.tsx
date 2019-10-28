import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";
import { LenkepanelData } from "../SkrivTilOssLenkepanel";

const tittel: string = "familieogbarn.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id={"familieogbarn.infotekst"}/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: "skrivtiloss.temalenke.chat.ingress",
    url: urls.temaFamilieOgBarn.chat,
    lenkeTekst: "skrivtiloss.temalenke.chat.tittel",
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: "skrivtiloss.temalenke.facebook.ingress",
    url: urls.facebook,
    lenkeTekst: "skrivtiloss.temalenke.chat.tittel",
    external: true
  },
  {
    tittel: "familieogbarn.lenke.skrivtiloss.tittel",
    ingress: "familieogbarn.lenke.skrivtiloss.ingress", // values={{numDager: vars.svartidDager}}/>,
    ingressValues: {numDager: vars.svartidDager.toString()},
    url: urls.temaFamilieOgBarn.skrivtiloss,
    lenkeTekst: "skrivtiloss.temalenke.chat.tittel",
  },
];

const TemaFamilieOgBarn = () => (
  <SkrivTilOssBase
    tittel={tittel}
    ingress={ingress}
    lenker={lenker}
  />
);

export default TemaFamilieOgBarn;
