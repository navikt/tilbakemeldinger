import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Systemtittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { ChatTema, ChatTemaData } from "../../types/chat";
import { Hovedknapp } from "nav-frontend-knapper";
import { urls } from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { ApningsTider } from "../../types/datotid";

type ChatTemaProps = {
  chatTemaData: ChatTemaData,
  children: ReactNode,
};

const cssPrefix = "chat-tema";

const ikkeApent = (
  <AlertStripeInfo>
    {"Chatten er ikke åpen, prøv senere!"}
  </AlertStripeInfo>
);

const isChatOpen = (apningstider: ApningsTider) => {
  if (!apningstider) {
    return true;
  }


};

const ChatTemaSideBase = ({chatTemaData, children}: ChatTemaProps) => {
  const temaButtonHandlers: {[key in ChatTema]: Function} = {
    [ChatTema.Familie]: () => setLastClick(Date.now()),
    [ChatTema.AAP]: () => setLastClick(Date.now()),
    [ChatTema.Jobbsoker]: () => setLastClick(Date.now()),
    [ChatTema.Sosial]: () => setLastClick(Date.now()),
    [ChatTema.Okonomi]: () => setLastClick(Date.now()),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat),
  };

  const formatMessage = useIntl().formatMessage;
  const documentTitle = `${formatMessage({id: chatTemaData.tittelTekstId})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [lastClick, setLastClick] = useState();

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
            {children}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={
                () => temaButtonHandlers[chatTemaData.chatTema]()
              }
            >
              <FormattedMessage id={"chat.startknapp"}/>
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      <ChatbotWrapper chatTema={chatTemaData.chatTema} lastClick={lastClick}/>
    </>
  );
};

export default ChatTemaSideBase;
