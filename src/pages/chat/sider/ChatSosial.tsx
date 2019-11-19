import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { vars } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.sosialhjelp.tittel",
  chatTema: ChatTema.Sosial,
  apningstider: vars.chatBot.apningsTider.sosial,
};

const ChatSosial = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.sosialhjelp.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatSosial;
