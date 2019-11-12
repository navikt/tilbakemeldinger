import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const ChatOkonomi = () => {
  return(
    <ChatTemaSide
      tittelId={"chat.okonomi.tittel"}
      chatTema={ChatTema.Okonomi}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.okonomi.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatOkonomi;
