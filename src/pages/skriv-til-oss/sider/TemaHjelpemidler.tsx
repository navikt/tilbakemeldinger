import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { urls } from "../../../Config";

const Ingress = () => {
  const intl = useIntl();
  return (
    <MetaTags>
      <title>{intl.messages["skrivtiloss.hjelpemidler.tittel"]}</title>
      <meta
        name="description"
        content={
          intl.messages["skrivtiloss.hjelpemidler.description"] as string
        }
      />
    </MetaTags>
  );
};

const lenker: LenkepanelData[] = [
  {
    grafanaId: "hjelpemidler.generelt",
    tittelId: "skrivtiloss.hjelpemidler.generelt.tittel",
    ingress: (
      <FormattedMessage id={"skrivtiloss.hjelpemidler.generelt.ingress"} />
    ),
    url: urls.skrivTilOss.temaHjelpemidler.generelt,
    external: true
  },
  {
    grafanaId: "hjelpemidler.ortopediske",
    tittelId: "skrivtiloss.hjelpemidler.ortopediske.tittel",
    ingress: (
      <FormattedMessage id={"skrivtiloss.hjelpemidler.ortopediske.ingress"} />
    ),
    url: urls.skrivTilOss.temaHjelpemidler.ortopediske,
    external: true
  },
  {
    grafanaId: "hjelpemidler.bil",
    tittelId: "skrivtiloss.hjelpemidler.bil.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.bil.ingress"} />,
    url: urls.skrivTilOss.temaHjelpemidler.bil,
    external: true
  }
];

const TemaHjelpemidler = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.hjelpemidler.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
