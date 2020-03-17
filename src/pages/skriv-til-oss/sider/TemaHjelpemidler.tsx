import React from "react";
import { useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { hjelpemidlerLenkepaneler } from "../SkrivTilOssLenkerData";

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

const TemaHjelpemidler = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.hjelpemidler.tittel"} lenkepanelData={hjelpemidlerLenkepaneler}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
