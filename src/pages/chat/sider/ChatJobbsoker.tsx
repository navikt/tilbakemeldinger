import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { vars } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.jobbsoker.tittel",
  chatTema: ChatTema.Jobbsoker,
  apningstider: vars.chatBot.apningsTider.jobbsoker
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
