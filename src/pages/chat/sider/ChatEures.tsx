import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const ChatEURES = () => {
  return(
    <ChatTemaSide
      tittelId={"chat.eures.tittel"}
      chatTema={ChatTema.EURES}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.eures.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatEURES;
