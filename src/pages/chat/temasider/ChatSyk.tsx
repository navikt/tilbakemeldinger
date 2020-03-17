import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import { apningsTider, sykChatbotErLansert } from "../../../Config";
import { FormattedMessage } from "react-intl";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.syk.tittel",
  chatTema: ChatTema.Syk,
  apningstider: apningsTider[ChatTema.Syk],
  harChatbot: sykChatbotErLansert
};

const ChatSyk = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        {sykChatbotErLansert
          ? <FormattedMsgMedParagrafer id={"chat.chatbotinfo"} />
          : <FormattedMessage id={"chat.syk.ingress"} />}
      </>
    </ChatTemaSideBase>
  );
};

export default ChatSyk;
