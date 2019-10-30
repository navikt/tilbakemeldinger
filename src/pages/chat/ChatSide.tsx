import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { EtikettLiten, Normaltekst, Systemtittel } from "nav-frontend-typografi";
import EkspanderendePanelGruppe, { EkspanderendePanelData } from "../../components/ekspanderende-panel/EkspanderendePanelGruppe";
import { ChatTemaData, ChatTema } from "../../types/chat";
import chatSideInnhold from "./ChatSideInnhold";
import ChatKollapsetPanelInnhold from "./ChatKollapsetPanelInnhold";
import ChatEkspandertPanelInnhold, { ButtonClickHandler } from "./ChatEkspandertPanelInnhold";
import ChatbotWrangler from "../../utils/chatbotWrangler";

import ChatValgtIkon from "assets/ChatValgtIkon.svg";
import ChatIkkeValgtIkon from "assets/ChatUvalgtIkon.svg";
import NAVChatBot from "@navikt/nav-chatbot";

const cssPrefix = "chat-med-oss";
const sideTittel = "chat.forside.tittel";

const chatDataTilPanelInnhold =
  (
    chatTema: ChatTemaData,
    intlFormatMessage: Function,
    buttonClickHandler: ButtonClickHandler,
  ): EkspanderendePanelData => (
  {
    tittel: intlFormatMessage({id: chatTema.tittelId}),
    kollapsetInnhold: <ChatKollapsetPanelInnhold msgId={chatTema.kortTekstId} cssPrefix={cssPrefix}/>,
    ekspandertInnhold: (
      <ChatEkspandertPanelInnhold
        msgId={chatTema.langTekstId}
        cssPrefix={cssPrefix}
        temaKode={chatTema.temaKode}
        buttonClickHandler={buttonClickHandler}
      />
    ),
    id: chatTema.temaKode.toString(),
    ekspandertIkon: <img src={ChatValgtIkon} alt="" className={`${cssPrefix}__ikon`}/>,
    kollapsetIkon: <img src={ChatIkkeValgtIkon} alt="" className={`${cssPrefix}__ikon`}/>,
  }
);

const ChatSide = () => {
  const intlFormatMessage = useIntl().formatMessage;
  const documentTitle = `${intlFormatMessage({id: sideTittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const buttonClickHandler = (temaKode: ChatTema) => {
    ChatbotWrangler.apneChatbotForTema(temaKode);
  };

  const panelInnhold = chatSideInnhold.map(
    (chatTema) => chatDataTilPanelInnhold(chatTema, intlFormatMessage, buttonClickHandler));

  return(
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <EtikettLiten>
          <FormattedMessage id={"header.navperson"}/>
        </EtikettLiten>
        <div className={`${cssPrefix}__header`}>
          <Systemtittel>
            <FormattedMessage id={sideTittel}/>
          </Systemtittel>
        </div>
        <div className={`${cssPrefix}__ingress`}>
          <Normaltekst>
            <FormattedMessage id="chat.forside.ingress"/>
          </Normaltekst>
        </div>
        <div className={`${cssPrefix}__chat-valg-container`}>
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
