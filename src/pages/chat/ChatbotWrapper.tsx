import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import { ChatConfig } from "../../types/chat";
import chatbotUtils from "../../utils/chatbot";

type Props = {
  config: ChatConfig;
  openChatTimestamp: number;
};

const ChatbotWrapper = ({config, openChatTimestamp}: Props) => {
  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, []);

  useEffect(() => {
    if (openChatTimestamp) {
      chatbotUtils.apneChatbot();
    }
  }, [openChatTimestamp]);

  return (
    openChatTimestamp ?
    (
      <NAVChatBot
        configId={config.configId}
        queueKey={config.queueKey}
        customerKey={vars.chatBot.customerKey}
      />
    ) : null
  );
};

export default ChatbotWrapper;
