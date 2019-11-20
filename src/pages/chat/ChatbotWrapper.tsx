import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import { ChatConfig } from "../../types/chat";
import chatbotUtils from "../../utils/chatbot";

type Props = {
  config: ChatConfig;
  shouldBeOpen: boolean;
};

const ChatbotWrapper = ({config, shouldBeOpen}: Props) => {
  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, []);

  useEffect(() => {
    if (shouldBeOpen) {
      chatbotUtils.apneChatbot();
    }
  }, [shouldBeOpen]);

  return (
    shouldBeOpen ?
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
