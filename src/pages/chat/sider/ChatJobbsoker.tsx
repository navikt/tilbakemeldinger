import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.jobbsoker.tittel",
  chatTema: ChatTema.Jobbsoker,
  apningstider: apningsTider[ChatTema.Jobbsoker],
  harChatbot: false
};

const ChatJobbsoker = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.jobbsoker.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatJobbsoker;
