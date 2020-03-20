import React from "react";
import { useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { hjelpemidlerLenkepaneler } from "../skrivTilOssTemaLenker";

const Ingress = () => {
  const intl = useIntl();
  return (
    <MetaTags>
      <title>{intl.messages["skrivtiloss.hjelpemidler.mellomside.tittel"]}</title>
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
  <SkrivTilOssBase
    tittelId={"skrivtiloss.hjelpemidler.mellomside.tittel"}
    lenkepanelData={hjelpemidlerLenkepaneler}
  >
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
