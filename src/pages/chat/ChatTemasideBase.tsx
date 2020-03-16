import React, { ReactNode, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Systemtittel, Normaltekst, Undertittel } from "nav-frontend-typografi";
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
import { chatbotIdToSanityId } from "../../utils/sanity/endpoints/channel";
import NavFrontendSpinner from "nav-frontend-spinner";
import { TekniskProblemBackend } from "../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";

type Props = {
  chatTemaData: ChatTemaData,
  children: ReactNode
};

const cssPrefix = "chat-tema";

// TODO: refaktorer feilsjekking av backend data
const ChatTemaSideBase = ({ chatTemaData, children }: Props) => {
  const [chatButtonClicked, setChatButtonClicked] = useState();
  const [serverTidOffset, setServerTidOffset] = useState(0);
  const [{ channelProps, visTekniskFeilMelding }, dispatch] = useStore();

  useEffect(() => {
    fetchServerTidOffset(setServerTidOffset);
  }, []);

  const documentTitle = `${useIntl().formatMessage({
    id: chatTemaData.tittelTekstId
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  if (!channelProps.isLoaded) {
    return <NavFrontendSpinner />;
  }

  const chatProps = channelProps.types.chat;
  if (!chatProps) {
    !visTekniskFeilMelding && dispatch({ type: "SETT_TEKNISK_FEILMELDING" });
  }

  const temaButtonHandlers: { [key in ChatTema]: Function } = {
    [ChatTema.Jobbsoker]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Syk]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Familie]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Ufor]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Sosial]: () => setChatButtonClicked(Date.now()),
    [ChatTema.Okonomi]: () => setChatButtonClicked(Date.now()),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures.chat)
  };

  const { harChatbot, chatTema } = chatTemaData;
  const sanityTemaId = chatbotIdToSanityId[chatTema];
  const temaProps = chatProps && chatProps.themes && chatProps.themes.find(t => t._key === sanityTemaId);
  const temaClosed = temaProps && temaProps.closed;

  const chatErIApningstid = (chatTemaData.apningstider
    ? chatTemaData.apningstider.isOpenNow(serverTidOffset)
    : true) || true; // TODO: || true kun for test av stenging fra backend!
  const chatErNormaltApen = chatErIApningstid || harChatbot;
  const chatErStengtAvAdmin = (chatProps && chatProps.closed) || temaClosed;
  const chatMedVeilederErStengt = chatErStengtAvAdmin && chatErIApningstid;
  const chatErApen = (chatErNormaltApen && !chatMedVeilederErStengt) || harChatbot;

  const chatbotConfig = vars.chatBot.temaConfigs[chatTema];

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
            <Undertittel>{"Chat er satt til 'alltid åpen' med mindre det stenges fra Sanity. Ikke prodsett dette! :)"}</Undertittel>
            {visTekniskFeilMelding && <TekniskProblemBackend/>}
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
            <Normaltekst>
              {children}
              <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
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
