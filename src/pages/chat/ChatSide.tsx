import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import EkspanderendePanelGruppe, { EkspanderendePanelData } from "../../components/ekspanderende-panel/EkspanderendePanelGruppe";
import { ChatTemaData, ChatTema } from "../../types/chat";
import chatSideInnhold from "./ChatSideInnhold";
import ChatKollapsetPanel from "./ChatKollapsetPanel";
import ChatEkspandertPanel, { ButtonClickHandler } from "./ChatEkspandertPanel";
import ChatbotWrangler from "../../utils/chatbotWrangler";

import ChatValgtIkon from "assets/ChatValgtIkon.svg";
import ChatIkkeValgtIkon from "assets/ChatUvalgtIkon.svg";
import NAVChatBot from "@navikt/nav-chatbot";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { urls } from "../../Config";

const cssPrefix = "chat-med-oss";
const sideTittel = "chat.forside.tittel";

const temaButtonHandlers: {[key in ChatTema]: Function} = {
  [ChatTema.AAP]: () => ChatbotWrangler.apneChatbotForTema(ChatTema.AAP),
  [ChatTema.Familie]: () => ChatbotWrangler.apneChatbotForTema(ChatTema.Familie),
  [ChatTema.Sosial]: () => window.location.href = urls.chat.sosialhjelp,
  [ChatTema.Okonomi]: () => window.location.href = urls.chat.okonomi,
};

const chatDataTilPanelInnhold =
  (
    chatTema: ChatTemaData,
    intlFormatMessage: Function,
    buttonClickHandler: ButtonClickHandler,
  ): EkspanderendePanelData => (
  {
    tittel: intlFormatMessage({id: chatTema.tittelId}),
    kollapsetInnhold: <ChatKollapsetPanel msgId={chatTema.kortTekstId} cssPrefix={cssPrefix}/>,
    ekspandertInnhold: (
      <ChatEkspandertPanel
        msgId={chatTema.langTekstId}
        cssPrefix={cssPrefix}
        temaKode={chatTema.temaKode}
        buttonClickHandler={buttonClickHandler}
      />
    ),
    id: chatTema.temaKode.toString(),
    ekspandertIkon: <img src={ChatValgtIkon} alt="" className={`${cssPrefix}__panel-ikon`}/>,
    kollapsetIkon: <img src={ChatIkkeValgtIkon} alt="" className={`${cssPrefix}__panel-ikon`}/>,
  }
);

const ChatSide = () => {
  const intlFormatMessage = useIntl().formatMessage;
  const documentTitle = `${intlFormatMessage({id: sideTittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const buttonClickHandler = (temaKode: ChatTema) => {
    temaButtonHandlers[temaKode]();
  };

  const panelInnhold = chatSideInnhold.map(
    (chatTema) => chatDataTilPanelInnhold(chatTema, intlFormatMessage, buttonClickHandler));

  return(
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittel}/>
          </Sidetittel>
        </div>
        <div className={`${cssPrefix}__ingress`}>
          <Normaltekst>
            <FormattedMessage id="chat.forside.ingress"/>
          </Normaltekst>
        </div>
        <div className={`${cssPrefix}__temapanel-seksjon`}>
          {EkspanderendePanelGruppe(panelInnhold, "chatTemaVelger")}
        </div>
      </div>

      <NAVChatBot
        queueKey="Q_CHAT_BOT"
        customerKey="41155"
        configId={"c3372a51-6434-4770-a0aa-6e4edba3471e"}
      />
    </>
  );
};

export default ChatSide;
