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
import { isOpen } from "../../utils/apningstider";
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
    fetchServerTidOffset(setServerTidOffset);
  }, [documentTitle]);

  const [lastClick, setLastClick] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);

  const chatErApen = isOpen(chatTemaData.apningstider, serverTidOffset, vars.chatBot.stengteDager);

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
            {!chatErApen && <IkkeApentInfo />}
            {children}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={
                () => temaButtonHandlers[chatTemaData.chatTema]()
              }
              disabled={!chatErApen}
            >
              <FormattedMessage id={chatErApen ? "chat.startknapp" : "chat.disabledknapp"}/>
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      <ChatbotWrapper chatTema={chatTemaData.chatTema} lastClick={lastClick}/>
    </>
  );
};

export default ChatTemaSideBase;
