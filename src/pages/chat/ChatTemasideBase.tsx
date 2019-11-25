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
import Apningstider from "../../utils/apningstider";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";

type ChatTemaProps = {
  chatTemaData: ChatTemaData;
  children: ReactNode;
};

const cssPrefix = "chat-tema";

const ChatTemaSideBase = ({ chatTemaData, children }: ChatTemaProps) => {
  const [chatButtonClicked, setChatButtonClicked] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const documentTitle = `${useIntl().formatMessage({
    id: chatTemaData.tittelTekstId
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const temaButtonHandlers: { [key in ChatTema]: Function } = {
    [ChatTema.Familie]: () => setChatButtonClicked(Date.now()),
    [ChatTema.AAP]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Jobbsoker]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Sosial]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Okonomi]: () => setChatButtonClicked(Date.now()),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat)
  };

  const chatIApningstid = chatTemaData.apningstider
    ? Apningstider.isOpenNow(
        chatTemaData.apningstider,
        vars.chatBot.stengteDager,
        serverTidOffset
      )
    : true;

  const chatbotConfig = vars.chatBot.temaConfigs[chatTemaData.chatTema];

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
          <div className={`${cssPrefix}__panel-ingress`}>
            {!chatIApningstid && (
              <AlertStripeInfo>
                <FormattedMessage id={"chat.stengt.info"} />
              </AlertStripeInfo>
            )}
            {children}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={() => {
                logEvent({ event: chatTemaData.chatTema });
                temaButtonHandlers[chatTemaData.chatTema]();
              }}
              disabled={!chatIApningstid}
            >
              <FormattedMessage
                id={chatIApningstid ? "chat.knapp.start" : "chat.knapp.stengt"}
              />
            </Hovedknapp>
          </div>
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
