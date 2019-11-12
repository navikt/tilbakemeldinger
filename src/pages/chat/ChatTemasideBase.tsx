import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Systemtittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { ChatTema } from "../../types/chat";
import { Hovedknapp } from "nav-frontend-knapper";
import { urls } from "../../Config";
import PanelBase from "nav-frontend-paneler";

export type ChatTemaProps = {
  tittelId: string,
  chatTema: ChatTema,
  children: ReactNode,
};

const cssPrefix = "chat-tema";

const ChatTemaSide = ({tittelId, chatTema, children}: ChatTemaProps) => {
  const temaButtonHandlers: {[key in ChatTema]: Function} = {
    [ChatTema.Familie]: () => setLastClick(Date.now()),
    [ChatTema.AAP]: () => setLastClick(Date()),
    [ChatTema.Jobbsoker]: () => setLastClick(Date()),
    [ChatTema.Sosial]: () => window.location.assign(urls.chat.sosialhjelp.chat),
    [ChatTema.Okonomi]: () => window.location.assign(urls.chat.okonomi.chat),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat),
  };

  const formatMessage = useIntl().formatMessage;
  const documentTitle = `${formatMessage({id: tittelId})} - www.nav.no`;
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
              <FormattedMessage id={tittelId} />
            </Systemtittel>
          </div>
          <div className={`${cssPrefix}__panel-ingress`}>
            {children}
          </div>
          <div className={`${cssPrefix}__panel-start-knapp`}>
            <Hovedknapp
              htmlType={"button"}
              onClick={
                () => temaButtonHandlers[chatTema]()
              }
            >
              <FormattedMessage id={"chat.startknapp"}/>
            </Hovedknapp>
          </div>
        </PanelBase>
      </div>
      <ChatbotWrapper chatTema={chatTema} lastClick={lastClick}/>
    </>
  );
};

export default ChatTemaSide;
