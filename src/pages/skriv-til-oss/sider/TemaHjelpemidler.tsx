import React, { ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

const tittel: string = "hjelpemidler.tittel";

const Ingress = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags>
        <title>{intl.messages["hjelpemidler.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["hjelpemidler.description"] as string}
        />
      </MetaTags>
      <Normaltekst className="skriv-til-oss__infotekst">
        <FormattedMessage id={"hjelpemidler.infotekst"} />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    tittel: "hjelpemidler.lenke.generelt.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.generelt.ingress"} />,
    url: urls.temaHjelpemidler.generelt,
    external: false
  },
  {
    tittel: "hjelpemidler.lenke.skrivtiloss.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.skrivtiloss.ingress"} />,
    url: urls.temaHjelpemidler.skrivtiloss,
    external: false
  },
  {
    tittel: "hjelpemidler.lenke.bil.tittel",
    ingress: <FormattedMessage id={"hjelpemidler.lenke.bil.ingress"} />,
    url: urls.temaHjelpemidler.bil,
    external: false
  }
];

const TemaHjelpemidler = () => (
  <SkrivTilOssBase tittel={"hjelpemidler.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
