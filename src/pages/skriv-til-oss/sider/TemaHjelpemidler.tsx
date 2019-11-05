import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

const Ingress = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags>
        <title>{intl.messages["skrivtiloss.hjelpemidler.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["skrivtiloss.hjelpemidler.description"] as string}
        />
      </MetaTags>
      <Normaltekst className="skriv-til-oss__infotekst">
        <FormattedMessage id={"skrivtiloss.hjelpemidler.infotekst"} />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.hjelpemidler.generelt.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.generelt.ingress"} />,
    url: urls.skrivTilOss.temaHjelpemidler.generelt,
    external: true
  },
  {
    tittel: "skrivtiloss.hjelpemidler.ortopediske.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.ortopediske.ingress"} />,
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
    external: true
  },
  {
    tittel: "skrivtiloss.hjelpemidler.bil.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.bil.ingress"} />,
    url: urls.skrivTilOss.temaHjelpemidler.bil,
    external: true
  },
  {
    tittel: "skrivtiloss.hjelpemidler.tolk.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.tolk.ingress"} />,
    url: urls.skrivTilOss.temaHjelpemidler.tolk,
    external: true
  }
];

const TemaHjelpemidler = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.hjelpemidler.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
