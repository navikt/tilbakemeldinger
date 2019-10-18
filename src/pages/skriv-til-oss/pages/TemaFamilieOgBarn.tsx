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
      <FormattedMessage id={"familieogbarn.infotekst"}/>
    </Normaltekst>
  </>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.chat.ingress"}/>,
    url: urls.temaFamilieOgBarn.chat,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.facebook.ingress"}/>,
    url: urls.facebook,
    external: true
  },
  {
    tittel: "familieogbarn.lenke.skrivtiloss.tittel",
    ingress: <FormattedMessage id={"familieogbarn.lenke.skrivtiloss.ingress"} values={{numDager: vars.svartidDager}}/>,
    url: urls.temaFamilieOgBarn.skrivtiloss,
    external: false
  },
];

const TemaFamilieOgBarn = () => (
  <SkrivTilOssBase
    tittel={"familieogbarn.tittel"}
    ingress={ingress}
    lenker={lenker}
  />
);

export default TemaFamilieOgBarn;
