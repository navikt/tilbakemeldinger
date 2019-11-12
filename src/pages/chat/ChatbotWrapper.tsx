import React, { useEffect } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import { ChatTema } from "../../types/chat";
import chatbotUtils from "../../utils/chatbotUtils";

type Props = {
  chatTema: ChatTema | null;
  lastClick: number;
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
  [ChatTema.Jobbsoker]: {
    configId: vars.chatBot.configIds.jobbsoker,
    queueKey: vars.chatBot.queueKeys.jobbsoker,
  },
  [ChatTema.Sosial]: null,
  [ChatTema.Okonomi]: null,
  [ChatTema.EURES]: null,
};

const ChatbotWrapper = ({chatTema, lastClick}: Props) => {
  const temaConfig = chatTema ? getTemaConfig[chatTema] : null;
  console.log(JSON.stringify(temaConfig));
  console.log(lastClick);

  useEffect(() => {
    console.log("First render, initializing...");
    chatbotUtils.clearSessionData();
    chatbotUtils.initEventDispatcherHooks();
  }, []);

  useEffect(() => {
    console.log("Chatbot update!");

    if (temaConfig === null || !lastClick) {
      return;
    }

    chatbotUtils.apneChatbot();
  }, [lastClick, temaConfig]);

  return (
    temaConfig && lastClick ?
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
