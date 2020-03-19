import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { Hovedknapp } from "nav-frontend-knapper";
import Config from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import { useStore } from "../../providers/Provider";
import NavFrontendSpinner from "nav-frontend-spinner";
import { TekniskProblemBackend } from "../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";
import { ChatTema, Kanal } from "../../types/kanaler";
import { chatTemaSideData } from "./data/chatTemasideData";
import { chatApningstider } from "./data/chatApningtider";
import { chatConfig } from "./data/chatConfig";
import { Language } from "../../utils/sanity/serializers";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";

type Props = {
  chatTema: ChatTema,
};

const Varsel = ({ tekstId }: { tekstId: string }) => (
  <AlertStripeInfo className={"varsel-panel"}>
    <FormattedMessage id={tekstId} />
  </AlertStripeInfo>
);

const cssPrefix = "chat-tema";

const ChatTemaside = ({ chatTema }: Props) => {
  const [chatButtonClickedTimestamp, setChatButtonClickedTimestamp] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ themes, channels, visTekniskFeilMelding }] = useStore();
  const intl = useIntl();

  const startChat = chatTema === ChatTema.EURES
    ? () => window.location.assign(Config.urls.chat.eures.chat)
    : () => setChatButtonClickedTimestamp(Date.now());

  const { harChatbot, tittelId, grafanaId } = chatTemaSideData[chatTema];
  const temaProps = themes.props[chatTema];
  const channelProps = channels.props[Kanal.Chat];

  const text = temaProps.page;
  const tittel = (text && text.title && text.title[Language.Bokmaal])
    || intl.formatMessage({ id: tittelId });
  const ingress = text && <BlockContent blocks={text.content} serializers={serializers} />;

  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);
  const apningsTider = chatApningstider[chatTema];
  const chatErIApningstid = apningsTider
    ? apningsTider.isOpenNow(serverTidOffset)
    : true;
  const chatErNormaltApen = chatErIApningstid || harChatbot;
  const chatVeilederStengtAvAdmin = (channelProps.closed || temaProps.closed) && chatErIApningstid;
  const chatErApen = (chatErNormaltApen && !chatVeilederStengtAvAdmin) || harChatbot;

  const chatClientConfig = chatConfig.tema[chatTema];

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <PanelBase className={cssPrefix}>
          <div className={`${cssPrefix}__header`}>
            <Systemtittel>
              {tittel}
            </Systemtittel>
          </div>
          {(themes.isLoaded && channels.isLoaded) ? (
            <>
              <div className={`${cssPrefix}__panel-ingress`}>
                {visTekniskFeilMelding && <TekniskProblemBackend />}
                {!chatErNormaltApen && <Varsel tekstId="chat.stengt.info" />}
                {chatVeilederStengtAvAdmin && <Varsel tekstId={"chat.admin-stengt.veileder"} />}
                <StorPaagangVarsel />
                {ingress}
              </div>
              {apningsTider && (
                <ApningstiderAvvik
                  apningstider={apningsTider}
                  harChatbot={harChatbot}
                />
              )}
              <div className={`${cssPrefix}__panel-start-knapp`}>
                <Hovedknapp
                  htmlType={"button"}
                  onClick={() => {
                    logEvent({ event: grafanaId });
                    startChat();
                  }}
                  disabled={!chatErApen}
                >
                  <FormattedMessage id={chatErApen ? "chat.knapp.start" : "chat.knapp.stengt"} />
                </Hovedknapp>
              </div>
            </>
          ) : <NavFrontendSpinner />}
        </PanelBase>
      </div>
      {chatClientConfig && (
        <ChatbotWrapper
          config={chatClientConfig}
          openChatTimestamp={chatButtonClickedTimestamp}
        />
      )}
    </>
  );
};

export default ChatTemaside;
