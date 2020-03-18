import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { Normaltekst } from "nav-frontend-typografi";
import AlertStripe from "nav-frontend-alertstriper";
import { useStore } from "../../../providers/Provider";
import { Language, serializers, TextBlock } from "../../../utils/sanity/serializers";
import NavFrontendSpinner from "nav-frontend-spinner";
import { TekniskProblemBackend } from "../../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";
import BlockContent from "@sanity/block-content-to-react";
import { Kanal } from "../../../types/kanaler";
import { skrivTilOssLenkepaneler } from "../SkrivTilOssLenkerData";

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
      <BlockContent blocks={tekst} serializers={serializers}/>
    </>
  );
};

const StengtMelding = () => (
  <AlertStripe type="advarsel" className={"varsel-panel"}>
    <FormattedMessage id={"skrivtiloss.disabled"} />
  </AlertStripe>
);

const SkrivTilOssForside = () => {
  const [{ channels, visTekniskFeilMelding }] = useStore();

  const stoProps = channels.props[Kanal.SkrivTilOss];
  const isClosed = stoProps.closed;
  const svartid = stoProps.answer_time;
  const tekstBlokk = stoProps.description;

  return (
    <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenkepanelData={isClosed ? undefined : skrivTilOssLenkepaneler}>
      {channels.isLoaded ? (
        <>
          {!isClosed && svartid && svartid[Language.Bokmaal] && (
            <Normaltekst className={"svartid"}>
              <FormattedMessage id={"kontaktoss.svartid"} />
              {svartid[Language.Bokmaal]}
            </Normaltekst>
          )}
          <Ingress tekst={tekstBlokk} />
          {visTekniskFeilMelding && <TekniskProblemBackend/>}
          {isClosed && <StengtMelding />}
        </>
      ) : <NavFrontendSpinner />}
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
