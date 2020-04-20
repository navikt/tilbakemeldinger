import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { useStore } from "../../../providers/Provider";
import { Kanal } from "../../../types/kanaler";
import { skrivTilOssLenkepaneler } from "../skrivTilOssTemaLenker";
import { LocaleBlockContent } from "../../../components/sanity-blocks/LocaleBlockContent";
import { useLocaleString } from "../../../utils/sanity/useLocaleString";
import { LocaleBlock } from "../../../utils/sanity/common-types";
import { MetaTags } from "../../../components/metatags/MetaTags";

const Ingress = ({ tekst }: { tekst: LocaleBlock | undefined }) => (
  <>
    <MetaTags
      titleId={"skrivtiloss.tittel"}
      descriptionId={"skrivtiloss.description"}
    />
    <LocaleBlockContent localeBlock={tekst} />
  </>
);

const SkrivTilOssForside = () => {
  const [{ channels }] = useStore();
  const localeString = useLocaleString();

  const stoProps = channels.props[Kanal.SkrivTilOss];
  const svartid = localeString(stoProps.answer_time);

  return (
    <SkrivTilOssBase
      tittelId={"skrivtiloss.tittel"}
      lenkepanelData={skrivTilOssLenkepaneler}
    >
      <>
        {svartid && (
          <Normaltekst className={"svartid"}>
            {svartid}
          </Normaltekst>
        )}
        <Ingress tekst={stoProps.preamble} />
      </>
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
