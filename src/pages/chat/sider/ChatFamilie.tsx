import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const ChatFamilie = () => {
  return(
    <ChatTemaSide
      tittelId={"chat.familie.tittel"}
      chatTema={ChatTema.Familie}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.chatbotinfo"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatFamilie;
