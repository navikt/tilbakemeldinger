import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import ChatbotWrangler from "../../utils/chatbotWrangler";
import { ChatTema } from "../../types/chat";

type Props = {
  chatTema: ChatTema | null;
};

type ChatbotConfig = {
  configId: string;
  queueKey: string;
};

const getTemaConfig: {[key in ChatTema]: ChatbotConfig | null} = {
  [ChatTema.AAP]: {
    configId: vars.chatBot.configIds.aap,
    queueKey: vars.chatBot.queueKeyBot,
  },
  [ChatTema.Familie]: {
    configId: vars.chatBot.configIds.familie,
    queueKey: vars.chatBot.queueKeyBot,
  },
  [ChatTema.Sosial]: null,
  [ChatTema.Okonomi]: null,
};

const ChatbotWrapper = ({chatTema}: Props) => {
  useEffect(() => {
    console.log("Chatbot update!");
    return () => {
      console.log("Chatbot cleanup!");
      ChatbotWrangler.apneChatbot();
    };
  });

  const temaConfig = chatTema ? getTemaConfig[chatTema] : null;

  return (temaConfig ?
    (
      <NAVChatBot
        configId={temaConfig.configId}
        queueKey={temaConfig.queueKey}
        customerKey={vars.chatBot.customerKey}
      />
    ) : null
  );
};

export default ChatbotWrapper;
