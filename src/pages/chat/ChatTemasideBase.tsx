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

type ChatTemaProps = {
  chatTemaData: ChatTemaData,
  children: ReactNode,
};

const cssPrefix = "chat-tema";

const IkkeApentInfo = () => (
  <AlertStripeInfo>
    <FormattedMessage id={"chat.stengt.info"} />
  </AlertStripeInfo>
);

const ChatTemaSideBase = ({chatTemaData, children}: ChatTemaProps) => {
  const updateChatbot = () => {
    setButtonClicked(Date.now());
  };

  const temaButtonHandlers: {[key in ChatTema]: Function} = {
    [ChatTema.Familie]: updateChatbot,
    [ChatTema.AAP]: updateChatbot,
    [ChatTema.Jobbsoker]: updateChatbot,
    [ChatTema.Sosial]: updateChatbot,
    [ChatTema.Okonomi]: updateChatbot,
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat),
  };

  const documentTitle = `${useIntl().formatMessage({id: chatTemaData.tittelTekstId})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const [buttonClicked, setButtonClicked] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);

  const isChatIApningstid = chatTemaData.apningstider
    ? Apningstider.isOpenNow(chatTemaData.apningstider, vars.chatBot.stengteDager, serverTidOffset)
    : true;

  const chatbotConfig = vars.chatBot.temaConfigs[chatTemaData.chatTema];

  return(
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper/>
        <PanelBase className={cssPrefix}>
          <div className={`${cssPrefix}__header`}>
            <Systemtittel>
              <FormattedMessage id={chatTemaData.tittelTekstId} />
            </Systemtittel>
          </div>
          <div className={`${cssPrefix}__panel-ingress`}>
            {!isChatIApningstid && <IkkeApentInfo />}
            {children}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={
                () => temaButtonHandlers[chatTemaData.chatTema]()
              }
              disabled={!isChatIApningstid}
            >
              <FormattedMessage id={isChatIApningstid ? "chat.startknapp" : "chat.disabledknapp"}/>
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      {chatbotConfig && (
        <ChatbotWrapper
          config={chatbotConfig}
          openChat={buttonClicked}
        />
      )}
    </>
  );
};

export default ChatTemaSideBase;
