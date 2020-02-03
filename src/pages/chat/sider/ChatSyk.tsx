import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.syk.tittel",
  chatTema: ChatTema.Syk,
  apningstider: apningsTider[ChatTema.Syk],
  harChatbot: false
};

const ChatSyk = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.syk.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatSyk;
