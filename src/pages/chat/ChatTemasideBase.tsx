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
import { ApningsTider } from "types/datotid";

type ChatTemaProps = {
  chatTemaData: ChatTemaData;
  children: ReactNode;
};

type AvvikProps = {
  apningstider: ApningsTider;
};

const cssPrefix = "chat-tema";

const ApningstiderAvvik = ({apningstider}: AvvikProps) => {
  const apningstiderAvvik = apningstider && Apningstider.makeAvvikstiderStrings(
    apningstider,
    vars.chatBot.visSpesielleTiderForAntallFremtidigeDager
  );

  return apningstiderAvvik && (
    <div className={`${cssPrefix}__avvik`}>
      <span className={`${cssPrefix}__avvik-header`}><FormattedMsgMedParagrafer id="apningstid.avvik" /></span>
      {apningstiderAvvik.map((datoTidsrom, index) => (
        datoTidsrom.tidsrom ? (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.apent"
              values={{dato: datoTidsrom.dato, start: datoTidsrom.tidsrom.start, end: datoTidsrom.tidsrom.end}}
              key={`tid${index}`}
            />
          )
          : (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.stengt"
              values={{dato: datoTidsrom.dato}}
              key={`tid${index}`}
            />
          )
      ))}
    </div>
  );
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
    ? Apningstider.isOpenNow(
        chatTemaData.apningstider,
        vars.chatBot.helligdager,
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
                <FormattedMessage id="chat.stengt.info" />
              </AlertStripeInfo>
            )}
            <Normaltekst>
              {children}
            </Normaltekst>
          </div>
          {chatTemaData.apningstider && <ApningstiderAvvik apningstider={chatTemaData.apningstider} />}
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
