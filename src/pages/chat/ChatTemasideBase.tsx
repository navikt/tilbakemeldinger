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
  const updateChatbot = () => setClickedTime(Date.now());
  const redirectTo = (url: string) => window.location.assign(url);

  const temaButtonHandlers: {[key in ChatTema]: Function} = {
    [ChatTema.Familie]: updateChatbot,
    [ChatTema.AAP]: updateChatbot,
    [ChatTema.Jobbsoker]: updateChatbot,
    [ChatTema.Sosial]: updateChatbot,
    [ChatTema.Okonomi]: updateChatbot,
    [ChatTema.EURES]: () => redirectTo(urls.chat.eures.chat),
  };

  const documentTitle = `${useIntl().formatMessage({id: chatTemaData.tittelTekstId})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const [clickedTime, setClickedTime] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);

  const isChatIApningstid = chatTemaData.apningstider
    ? Apningstider.isOpenNow(chatTemaData.apningstider, vars.chatBot.stengteDager, serverTidOffset)
    : true;

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
      <ChatbotWrapper chatTema={chatTemaData.chatTema} lastClick={clickedTime}/>
    </>
  );
};

export default ChatTemaSideBase;
