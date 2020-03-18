import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Systemtittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { ChatTema, ChatTemaData } from "../../types/chat";
import { Hovedknapp } from "nav-frontend-knapper";
import { urls, vars } from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import { useStore } from "../../providers/Provider";
import NavFrontendSpinner from "nav-frontend-spinner";
import { TekniskProblemBackend } from "../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";
import { Kanal } from "../../types/kanaler";

type Props = {
  chatTemaData: ChatTemaData,
  children: ReactNode
};

const cssPrefix = "chat-tema";

const ChatTemaSideBase = ({ chatTemaData, children }: Props) => {
  const [chatButtonClicked, setChatButtonClicked] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ themes, channels, visTekniskFeilMelding }] = useStore();

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const documentTitle = `${useIntl().formatMessage({
    id: chatTemaData.tittelTekstId
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const temaProps = themes.props[chatTemaData.chatTema];
  const channelProps = channels.props[Kanal.Chat];

  const { harChatbot, chatTema } = chatTemaData;
  const temaClosed = temaProps.closed;
  const channelClosed = channelProps.closed;

  const chatErIApningstid = (chatTemaData.apningstider
    ? chatTemaData.apningstider.isOpenNow(serverTidOffset)
    : true);
  const chatErNormaltApen = chatErIApningstid || harChatbot;
  const chatErStengtAvAdmin = channelClosed || temaClosed;
  const chatMedVeilederErStengt = chatErStengtAvAdmin && chatErIApningstid;
  const chatErApen = (chatErNormaltApen && !chatMedVeilederErStengt) || harChatbot;

  const chatbotConfig = vars.chatBot.temaConfigs[chatTema];

  const temaButtonHandlers: { [key in ChatTema]: Function } = {
    [ChatTema.Arbeidsgiver]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Jobbsoker]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Syk]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Familie]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Ufor]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Sosial]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Okonomi]: () => setChatButtonClicked(Date.now()),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat)
  };

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <PanelBase className={cssPrefix}>
          <div className={`${cssPrefix}__header`}>
            <Systemtittel>
              <FormattedMessage id={chatTemaData.tittelTekstId} />
            </Systemtittel>
          </div>
          {(themes.isLoaded && channels.isLoaded) ? (
            <>
              <div className={`${cssPrefix}__panel-ingress`}>
                {visTekniskFeilMelding && <TekniskProblemBackend />}
                {!chatErNormaltApen && (
                  <AlertStripeInfo className={`${cssPrefix}__chat-stengt-alert varsel-panel`}>
                    <FormattedMessage id="chat.stengt.info" />
                  </AlertStripeInfo>
                )}
                {chatMedVeilederErStengt && (
                  <AlertStripeInfo className={`varsel-panel`}>
                    <FormattedMessage id={"chat.admin-stengt.veileder"} />
                  </AlertStripeInfo>
                )}
                <StorPaagangVarsel />
                {children}
                <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
              </div>
              {
                chatTemaData.apningstider && (
                  <ApningstiderAvvik
                    apningstider={chatTemaData.apningstider}
                    harChatbot={chatTemaData.harChatbot}
                  />
                )
              }
              <div className={`${cssPrefix}__panel-start-knapp`}>
                <Hovedknapp
                  htmlType={"button"}
                  onClick={() => {
                    logEvent({ event: chatTemaData.chatTema });
                    temaButtonHandlers[chatTemaData.chatTema]();
                  }}
                  disabled={!chatErApen}
                >
                  <FormattedMessage
                    id={chatErApen ? "chat.knapp.start" : "chat.knapp.stengt"}
                  />
                </Hovedknapp>
              </div>
            </>
          ) : <NavFrontendSpinner />}
        </PanelBase>
      </div>
      {chatbotConfig && (
        <ChatbotWrapper
          config={chatbotConfig}
          openChatTimestamp={chatButtonClicked}
        />
      )}
    </>
  );
};

export default ChatTemaSideBase;
