import React, { ReactNode } from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

const ingress: ReactNode = (
  <Normaltekst className="skriv-til-oss__infotekst">
    <FormattedMessage id="skrivtiloss.ingress"/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.arbeidssoker.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.arbeidssoker.lenke.ingress"}/>,
    url: urls.skrivTilOss.arbeidssoker,
    external: false
  },
  {
    tittel: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.familieogbarn.lenke.ingress"}/>,
    url: urls.skrivTilOss.familieogbarn,
    external: false
  },
  {
    tittel: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.pensjonist.lenke.ingress"}/>,
    url: urls.skrivTilOss.pensjonist,
    external: true
  },
  {
    tittel: "skrivtiloss.syk.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.syk.lenke.ingress"}/>,
    url: urls.skrivTilOss.syk,
    external: true
  },
  {
    tittel: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"}/>,
    url: urls.skrivTilOss.hjelpemidler,
    external: false
  },
];

const SkrivTilOssForside = () => (
  <SkrivTilOssBase
    tittel={"skrivtiloss.tittel"}
    ingress={ingress}
    lenker={lenker}
  />
);

export default SkrivTilOssForside;
