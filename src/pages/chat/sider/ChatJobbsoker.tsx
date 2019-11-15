import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const ChatJobbsoker = () => {
  return(
    <ChatTemaSide
      tittelId={"chat.jobbsoker.tittel"}
      chatTema={ChatTema.Jobbsoker}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.jobbsoker.ingress"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatJobbsoker;
