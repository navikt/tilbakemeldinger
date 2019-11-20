import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import { ChatConfig } from "../../types/chat";
import chatbotUtils from "../../utils/chatbot";

type Props = {
  config: ChatConfig;
  openChat: boolean;
};

const ChatbotWrapper = ({config, openChat}: Props) => {
  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, []);

  useEffect(() => {
    if (openChat) {
      chatbotUtils.apneChatbot();
    }
  }, [openChat]);

  return (
    openChat ?
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
