import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import EkspanderendePanelGruppe from "../../components/ekspanderende-panel/EkspanderendePanelGruppe";
import { ChatTemaData, ChatTema } from "../../types/chat";
import chatSideInnhold from "./ChatSideInnhold";
import ChatKollapsetPanel from "./ChatKollapsetPanel";
import ChatEkspandertPanel from "./ChatEkspandertPanel";

import ChatValgtIkon from "assets/ChatValgtIkon.svg";
import ChatIkkeValgtIkon from "assets/ChatUvalgtIkon.svg";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { urls } from "../../Config";
import { EkspanderendePanelData } from "../../components/ekspanderende-panel/EkspanderendePanel";
import ChatbotWrapper from "./ChatbotWrapper";

const cssPrefix = "chat-med-oss";
const sideTittel = "chat.forside.tittel";

const ChatSide = () => {
  const chatDataTilPanelInnhold = (chatTema: ChatTemaData, formatMessage: Function): EkspanderendePanelData => (
    {
      tittel: formatMessage({id: chatTema.tittelId}),
      kollapsetInnhold: (
        <ChatKollapsetPanel
          msgId={chatTema.kortTekstId}
          cssPrefix={cssPrefix}
        />
      ),
      ekspandertInnhold: (
        <ChatEkspandertPanel
          msgIds={chatTema.langTekstIds}
          cssPrefix={cssPrefix}
          temaKode={chatTema.temaKode}
          buttonClickHandler={temaButtonHandlers[chatTema.temaKode]}
        />
      ),
      id: chatTema.temaKode.toString(),
      ekspandertIkon: <img src={ChatValgtIkon} alt="" className={`${cssPrefix}__panel-ikon`}/>,
      kollapsetIkon: <img src={ChatIkkeValgtIkon} alt="" className={`${cssPrefix}__panel-ikon`}/>,
    }
  );

  const [valgtChatTema, setValgtChatTema] = useState<ChatTema | null>(null);
  const [sisteTemavalgTimestamp, setSisteTemavalgTimestamp] = useState(Date());

  const temaButtonHandlers: {[key in ChatTema]: Function} = {
    [ChatTema.Familie]: () => {
      setSisteTemavalgTimestamp(Date());
      setValgtChatTema(ChatTema.Familie);
    },
    [ChatTema.AAP]: () => {
      setSisteTemavalgTimestamp(Date());
      setValgtChatTema(ChatTema.AAP);
    },
    [ChatTema.Jobbsoker]: () => {
      setSisteTemavalgTimestamp(Date());
      setValgtChatTema(ChatTema.Jobbsoker);
    },
    [ChatTema.Sosial]: () => window.location.assign(urls.chat.sosialhjelp),
    [ChatTema.Okonomi]: () => window.location.assign(urls.chat.okonomi),
    [ChatTema.EURES]: () => window.location.assign(urls.chat.eures),
  };

  const formatMessage = useIntl().formatMessage;

  const panelInnhold = chatSideInnhold.map(chatTema => chatDataTilPanelInnhold(chatTema, formatMessage));

  const documentTitle = `${formatMessage({id: sideTittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

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
          <EkspanderendePanelGruppe
            panelData={panelInnhold}
            groupName="chatTemaVelger"
          />
        </div>
      </div>
      <ChatbotWrapper chatTema={valgtChatTema} timeStamp={sisteTemavalgTimestamp}/>
    </>
  );
};

export default ChatSide;
