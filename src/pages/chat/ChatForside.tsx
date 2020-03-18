import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Sidetittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { KoronaVirusVarsel } from "../../components/varsler/korona-virus-varsel/KoronaVirusVarsel";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import NavFrontendSpinner from "nav-frontend-spinner";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";
import { TekniskProblemBackend } from "../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";
import { chatTemaLenkepaneler } from "./ChatLenkerData";
import { TemaLenkepanelData } from "../../types/lenker";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const documentTitle = `${useIntl().formatMessage({ id: sideTittelId })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [{ channels, visTekniskFeilMelding }] = useStore();
  const chatProps = channels.props[Kanal.Chat];

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittelId} />
          </Sidetittel>
        </div>
        <div className={`${cssPrefix}__ingress`}>
          {channels.isLoaded
            ? <BlockContent blocks={chatProps.preamble} serializers={serializers} />
            : <NavFrontendSpinner />}
          {visTekniskFeilMelding && <TekniskProblemBackend />}
          <KoronaVirusVarsel />
          <StorPaagangVarsel />
        </div>
        <div className={`${cssPrefix}__temapanel-seksjon`}>
          {
            chatTemaLenkepaneler.map((lenkePanelData: TemaLenkepanelData) => (
                <TemaLenkepanel
                  lenkepanelData={lenkePanelData}
                  cssPrefix={cssPrefix}
                  key={lenkePanelData.url}
                />
              )
            )
          }
        </div>
      </div>
    </>
  );
};

export default ChatForside;
