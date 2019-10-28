import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";
import { LenkepanelData } from "../SkrivTilOssLenkepanel";

const tittel: string = "arbeidssoker.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id={"arbeidssoker.infotekst"}/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "arbeidssoker.lenke.veileder.tittel",
    ingress: "arbeidssoker.lenke.veileder.ingress",
    url: urls.temaArbeidssoker.veileder,
    lenkeTekst: "arbeidssoker.lenke.veileder.tittel",
  },
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: "skrivtiloss.temalenke.chat.ingress",
    url: urls.temaArbeidssoker.chat,
    lenkeTekst: "skrivtiloss.temalenke.chat.tittel",
  },
  {
    tittel: "arbeidssoker.lenke.skrivtiloss.tittel",
    ingress: "arbeidssoker.lenke.skrivtiloss.ingress",
    ingressValues: {numDager: vars.svartidDager.toString()},
    url: urls.temaArbeidssoker.skrivtiloss,
    lenkeTekst: "arbeidssoker.lenke.skrivtiloss.tittel",
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: "skrivtiloss.temalenke.facebook.ingress",
    url: urls.facebook,
    lenkeTekst: "skrivtiloss.temalenke.facebook.tittel",
    external: true
  },
  {
    tittel: "arbeidssoker.lenke.snapchat.tittel",
    ingress: "arbeidssoker.lenke.snapchat.ingress",
    url: urls.snapchat,
    lenkeTekst: "arbeidssoker.lenke.snapchat.tittel",
    external: true
  },
];

const TemaArbeidssoker = () => (
  <SkrivTilOssBase
    tittel={tittel}
    ingress={ingress}
    lenker={lenker}
  />
);

export default TemaArbeidssoker;
