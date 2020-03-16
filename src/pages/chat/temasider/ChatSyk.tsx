import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import { apningsTider } from "../../../Config";
import { FormattedMessage } from "react-intl";

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
        <FormattedMessage id={"chat.syk.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatSyk;
