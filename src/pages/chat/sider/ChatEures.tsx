import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.eures.tittel",
  chatTema: ChatTema.EURES,
  harChatbot: false
};

const ChatEURES = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.eures.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatEURES;
