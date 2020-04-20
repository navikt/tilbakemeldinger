import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { hjelpemidlerLenkepaneler } from "../skrivTilOssTemaLenker";
import { MetaTags } from "../../../components/metatags/MetaTags";

const TemaHjelpemidler = () => (
  <SkrivTilOssBase
    tittelId={"skrivtiloss.hjelpemidler.mellomside.tittel"}
    lenkepanelData={hjelpemidlerLenkepaneler}
  >
    <MetaTags
      titleId={"skrivtiloss.hjelpemidler.mellomside.tittel"}
      descriptionId={"skrivtiloss.hjelpemidler.description"}
    />
  </SkrivTilOssBase>
);

export default TemaHjelpemidler;
