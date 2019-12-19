import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.aap.tittel",
  chatTema: ChatTema.AAP,
  apningstider: apningsTider[ChatTema.AAP],
  harChatbot: true
};

const ChatAAP = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.chatbotinfo"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatAAP;
