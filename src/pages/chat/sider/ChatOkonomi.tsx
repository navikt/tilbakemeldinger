import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.okonomi.tittel",
  chatTema: ChatTema.Okonomi,
  apningstider: apningsTider[ChatTema.Okonomi],
  harChatbot: false
};

const ChatOkonomi = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <b>{"Chatten er dessverre stengt i dag."}</b>
        <FormattedMsgMedParagrafer id={"chat.okonomi.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatOkonomi;
