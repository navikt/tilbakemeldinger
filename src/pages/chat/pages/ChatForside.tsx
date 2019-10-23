import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { EtikettLiten, Normaltekst, Systemtittel } from "nav-frontend-typografi";
import EkspanderendePanelGruppe, { EkspanderendePanelData } from "../../EkspanderendePanelGruppe/EkspanderendePanelGruppe";
import { ChatTemaData } from "../../../types/chatTema";
import chatSideInnhold from "../ChatSideInnhold";
import ChatKollapsetPanelInnhold from "../ChatKollapsetPanelInnhold";
import ChatEkspandertPanelInnhold from "../ChatEkspandertPanelInnhold";

import ChatValgtIkon from "assets/ChatValgtIkon.svg";
import ChatIkkeValgtIkon from "assets/ChatUvalgtIkon.svg";

const cssPrefix = "chat-med-oss";
const sideTittel = "chat.forside.tittel";

const chatDataTilPanelInnhold = (chatTema: ChatTemaData, index: number, intlFormatMessage: Function): EkspanderendePanelData => (
  {
    tittel: intlFormatMessage({id: chatTema.tittelId}),
    kollapsetInnhold: <ChatKollapsetPanelInnhold msgId={chatTema.kortTekstId} cssPrefix={cssPrefix}/>,
    ekspandertInnhold: <ChatEkspandertPanelInnhold msgId={chatTema.langTekstId} cssPrefix={cssPrefix}/>,
    id: index.toString(),
    ekspandertIkon: <img src={ChatValgtIkon} alt="" className={`${cssPrefix}__ikon`}/>,
    kollapsetIkon: <img src={ChatIkkeValgtIkon} alt="" className={`${cssPrefix}__ikon`}/>,
  }
);

const ChatForside = () => {
  const intlFormatMessage = useIntl().formatMessage;
  const documentTitle = `${intlFormatMessage({id: sideTittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const panelInnhold = chatSideInnhold.map(
    (chatTema, index) => chatDataTilPanelInnhold(chatTema, index, intlFormatMessage));

  return(
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
  );
};

export default ChatForside;
