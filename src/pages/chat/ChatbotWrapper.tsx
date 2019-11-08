import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import ChatbotWrangler from "../../utils/chatbotUtils";
import { ChatTema } from "../../types/chat";
import chatbotUtils from "../../utils/chatbotUtils";

type Props = {
  chatTema: ChatTema | null;
};

type ChatbotConfig = {
  configId: string;
  queueKey: string;
};

const getTemaConfig: {[key in ChatTema]: ChatbotConfig | null} = {
  [ChatTema.Familie]: {
    configId: vars.chatBot.configIds.familie,
    queueKey: vars.chatBot.queueKeys.familie,
  },
  [ChatTema.AAP]: {
    configId: vars.chatBot.configIds.aap,
    queueKey: vars.chatBot.queueKeys.aap,
  },
  [ChatTema.Sosial]: null,
  [ChatTema.Okonomi]: null,
  [ChatTema.EURES]: null,
};

const ChatbotWrapper = ({chatTema}: Props) => {
  const temaConfig = chatTema ? getTemaConfig[chatTema] : null;
  console.log("chattema:" + chatTema + " // temaconfig:" + JSON.stringify(temaConfig));

  useEffect(() => {
    chatbotUtils.clearSessionData();
  }, [chatTema]);

  const chatbotComponent = temaConfig ?
    (
      <NAVChatBot
        configId={temaConfig.configId}
        queueKey={temaConfig.queueKey}
        customerKey={vars.chatBot.customerKey}
      />
    ) : null;

  useEffect(() => {
    console.log("Chatbot update!");
    return () => {
      console.log("Chatbot cleanup!");
      ChatbotWrangler.apneChatbot();
    };
  }, [chatbotComponent]);

  return (chatbotComponent);
};

export default ChatbotWrapper;
