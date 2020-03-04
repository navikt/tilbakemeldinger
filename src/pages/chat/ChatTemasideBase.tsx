import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Systemtittel, Normaltekst } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import ChatbotWrapper from "./ChatbotWrapper";
import { ChatTema, ChatTemaData } from "../../types/chat";
import { Hovedknapp } from "nav-frontend-knapper";
import { urls, vars } from "../../Config";
import PanelBase from "nav-frontend-paneler";
import { AlertStripeAdvarsel, AlertStripeInfo } from "nav-frontend-alertstriper";
import { fetchServerTidOffset } from "../../clients/apiClient";
import { logEvent } from "../../utils/logger";
import ApningstiderAvvik from "../../components/apningstider/ApningstiderAvvik";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import TidsbestemtVisning from "../../utils/TidsbestemtVisning";

type ChatTemaProps = {
  chatTemaData: ChatTemaData,
  children: ReactNode
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
    [ChatTema.Jobbsoker]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Syk]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Familie]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Ufor]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Sosial]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Okonomi]: () => setChatButtonClicked(Date.now()),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat)
  };

  const chatIApningstid = chatTemaData.apningstider
    ? chatTemaData.apningstider.isOpenNow(serverTidOffset)
    : true;
  const chatbotErApen = (chatTemaData.harChatbot && chatTemaData.apningstider && !chatTemaData.apningstider.getChatbotStengt());
  const chatErApen = chatIApningstid || chatbotErApen;

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
            <TidsbestemtVisning fra={"11:00 04-03-2020"} til={"13:30 04-03-2020"}>
              <AlertStripeAdvarsel className={`${cssPrefix}__chat-stengt-alert`}>
                {"Chat er stengt fra kl. 12:15 til 13:30 på grunn av møte."}
              </AlertStripeAdvarsel>
            </TidsbestemtVisning>
            <TidsbestemtVisning fra={"13:30 04-03-2020"}>
              {!chatErApen && (
                <AlertStripeInfo className={`${cssPrefix}__chat-stengt-alert`}>
                  <FormattedMessage id="chat.stengt.info" />
                </AlertStripeInfo>
              )}
            </TidsbestemtVisning>
            <Normaltekst>
              {children}
              <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
            </Normaltekst>
          </div>
          {chatTemaData.apningstider && (
            <ApningstiderAvvik
              apningstider={chatTemaData.apningstider}
              harChatbot={chatbotErApen}
            />
          )}
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
