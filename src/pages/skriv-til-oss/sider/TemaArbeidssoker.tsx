import React, { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";

const tittel: string = "arbeidssoker.tittel";

const Ingress = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags>
        <title>{intl.messages["feilogmangler.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["skrivtiloss.description"] as string}
        />
      </MetaTags>
      <Normaltekst className="skriv-til-oss__infotekst">
        <FormattedMessage id={"arbeidssoker.infotekst"} />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    tittel: "arbeidssoker.lenke.veileder.tittel",
    ingress: <FormattedMessage id={"arbeidssoker.lenke.veileder.ingress"} />,
    url: urls.temaArbeidssoker.veileder,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.chat.ingress"} />,
    url: urls.temaArbeidssoker.chat,
    external: false
  },
  {
    tittel: "arbeidssoker.lenke.skrivtiloss.tittel",
    ingress: (
      <FormattedMessage
        id={"arbeidssoker.lenke.skrivtiloss.ingress"}
        values={{ numDager: vars.svartidDager }}
      />
    ),
    url: urls.temaArbeidssoker.skrivtiloss,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.facebook.ingress"} />,
    url: urls.facebook,
    external: true
  },
  {
    tittel: "arbeidssoker.lenke.snapchat.tittel",
    ingress: <FormattedMessage id={"arbeidssoker.lenke.snapchat.ingress"} />,
    url: urls.snapchat,
    external: true
  }
];

const TemaArbeidssoker = () => (
  <SkrivTilOssBase tittel={"arbeidssoker.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaArbeidssoker;
