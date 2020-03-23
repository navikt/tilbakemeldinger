import React from "react";
import { useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import { useStore } from "../../../providers/Provider";
import { Language, TextBlock } from "../../../utils/sanity/serializers";
import { Kanal } from "../../../types/kanaler";
import { skrivTilOssLenkepaneler } from "../skrivTilOssTemaLenker";
import { SanityBlocks } from "../../../components/sanity-blocks/SanityBlocks";

const Ingress = ({tekst}: {tekst: TextBlock[] | undefined}) => {
  const intl = useIntl();

  return (
    <>
      <MetaTags>
        <title>{intl.messages["skrivtiloss.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["skrivtiloss.description"] as string}
        />
      </MetaTags>
      <SanityBlocks blocks={tekst} />
    </>
  );
};

const SkrivTilOssForside = () => {
  const [{ channels }] = useStore();

  const stoProps = channels.props[Kanal.SkrivTilOss];
  const isClosed = stoProps.closed;
  const svartid = stoProps.answer_time;
  const ingressTekstBlokk = stoProps.preamble;

  return (
    <SkrivTilOssBase
      tittelId={"skrivtiloss.tittel"}
      lenkepanelData={skrivTilOssLenkepaneler}
    >
      <>
        {!isClosed && svartid && svartid[Language.Bokmaal] && (
          <Normaltekst className={"svartid"}>
            {svartid[Language.Bokmaal]}
          </Normaltekst>
        )}
        <Ingress tekst={ingressTekstBlokk} />
      </>
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
