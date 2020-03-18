import React, { useEffect } from "react";
import NAVChatBot from "@navikt/nav-chatbot";
import chatbotUtils from "./chatbotUtils";
import { chatClientConfigs, ChatClientConfig } from "./data/chatClientConfigs";

type Props = {
  config: ChatClientConfig;
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
        customerKey={chatClientConfigs.customerKey}
      />
    ) : null
  );
};

export default ChatbotWrapper;
