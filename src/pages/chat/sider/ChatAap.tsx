import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

const ChatAAP = () => {
  return(
    <ChatTemaSide
      tittelId={"chat.aap.tittel"}
      chatTema={ChatTema.AAP}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.chatbotinfo"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatAAP;
