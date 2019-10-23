import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";

const tittel: string = "arbeidssoker.tittel";

const ingress: ReactNode = (
  <Normaltekst>
    <FormattedMessage id={"arbeidssoker.infotekst"}/>
  </Normaltekst>
);

const lenker: LenkepanelData[] = [
  {
    tittel: "arbeidssoker.lenke.veileder.tittel",
    ingress: <FormattedMessage id={"arbeidssoker.lenke.veileder.ingress"}/>,
    url: urls.temaArbeidssoker.veileder,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.chat.ingress"}/>,
    url: urls.temaArbeidssoker.chat,
    external: false
  },
  {
    tittel: "arbeidssoker.lenke.skrivtiloss.tittel",
    ingress: <FormattedMessage id={"arbeidssoker.lenke.skrivtiloss.ingress"} values={{numDager: vars.svartidDager}}/>,
    url: urls.temaArbeidssoker.skrivtiloss,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.facebook.ingress"}/>,
    url: urls.facebook,
    external: true
  },
  {
    tittel: "arbeidssoker.lenke.snapchat.tittel",
    ingress: <FormattedMessage id={"arbeidssoker.lenke.snapchat.ingress"}/>,
    url: urls.snapchat,
    external: true
  },
];

const TemaArbeidssoker = () => (
  <SkrivTilOssBase
    tittel={tittel}
    ingress={ingress}
    lenke={lenker}
  />
);

export default TemaArbeidssoker;
