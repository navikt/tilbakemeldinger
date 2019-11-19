import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.aap.tittel",
  chatTema: ChatTema.AAP
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
