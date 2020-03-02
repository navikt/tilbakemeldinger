import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";
import TidsbestemtVisning from "../../../utils/TidsbestemtVisning";

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
        <TidsbestemtVisning til={"23:59 02-03-2020"}><b>{"Chatten er dessverre stengt i dag."}</b></TidsbestemtVisning>
        <FormattedMsgMedParagrafer id={"chat.okonomi.ingress"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatOkonomi;
