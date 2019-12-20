import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Systemtittel, Normaltekst } from "nav-frontend-typografi";
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
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import moment from "moment-timezone";

type ChatTemaProps = {
  chatTemaData: ChatTemaData,
  children: ReactNode
};

type AvvikProps = {
  apningstider: Apningstider,
  harChatbot?: boolean
};

const cssPrefix = "chat-tema";

const ApningstiderAvvik = ({apningstider, harChatbot = false}: AvvikProps) => {
  const apningstiderAvvik = apningstider.getAktuelleAvvikstider();
  const datoFormat = (dato: string) => moment(dato, "DD-MM-YYYY").format("DD.MM.");

  return apningstiderAvvik.length > 0 ? (
    <div className={`${cssPrefix}__avvik`}>
      <span className={`${cssPrefix}__avvik-header`}>
        <FormattedMsgMedParagrafer id={harChatbot ? "apningstid.avvik.chatbot" : "apningstid.avvik"} />
      </span>
      {apningstiderAvvik.map((datoTidsrom, index) => (
        datoTidsrom.tidsrom ? (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.apent"
              values={{dato: datoFormat(datoTidsrom.dato), start: datoTidsrom.tidsrom.start, end: datoTidsrom.tidsrom.end}}
              key={`tid${index}`}
            />
          )
          : (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.stengt"
              values={{dato: datoFormat(datoTidsrom.dato)}}
              key={`tid${index}`}
            />
          )
      ))}
    </div>
  ) : null;
};

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
    ? chatTemaData.apningstider.isOpenNow(serverTidOffset)
    : true;
  const chatErApen = chatIApningstid || chatTemaData.harChatbot;

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
            {!chatErApen && (
              <AlertStripeInfo>
                <FormattedMessage id="chat.stengt.info" />
              </AlertStripeInfo>
            )}
            <Normaltekst>
              {children}
            </Normaltekst>
          </div>
          {chatTemaData.apningstider && (
            <ApningstiderAvvik
              apningstider={chatTemaData.apningstider}
              harChatbot={chatTemaData.harChatbot}
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
