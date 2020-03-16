import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import { apningsTider } from "../../../Config";
import { FormattedMessage } from "react-intl";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.ufor.tittel",
  chatTema: ChatTema.Ufor,
  apningstider: apningsTider[ChatTema.Ufor],
  harChatbot: false
};

const ChatUfor = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMessage id={"chat.ufor.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatUfor;
