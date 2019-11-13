import React from "react";
import ChatTemaSide from "../ChatTemasideBase";
import { ChatTema } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { deleteCookie } from "../../../utils/cookies";
import { vars } from "../../../Config";

const ChatSosial = () => {
  deleteCookie(vars.chatBot.oldChatbotCookieName);

  return(
    <ChatTemaSide
      tittelId={"chat.sosialhjelp.tittel"}
      chatTema={ChatTema.Sosial}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.sosialhjelp.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSide>
  );
};

export default ChatSosial;
