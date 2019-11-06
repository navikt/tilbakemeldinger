import NAVChatBot from "@navikt/nav-chatbot";
import React from "react";
import { vars } from "../../Config";

type Props = {
  configId?: string,
  queueKey?: string,
  customerKey?: string,
};

const ChatbotWrapper = (
  {configId, queueKey = vars.chatBot.queueKeyBot, customerKey = vars.chatBot.customerKey}: Props) => {

  return (
    configId ? (
      <NAVChatBot
        queueKey={queueKey}
        customerKey={customerKey}
        configId={configId}
      />
    ) : null
  );
};

export default ChatbotWrapper;
