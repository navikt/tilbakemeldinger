import React, { useEffect, useState } from "react";
import { vars } from "../../Config";

import NAVChatBot from "@navikt/nav-chatbot";
import { ChatTema } from "../../types/chat";
import chatbotUtils from "../../utils/chatbotUtils";

type Props = {
  chatTema: ChatTema | null;
  timeStamp: string;
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

const ChatbotWrapper = ({chatTema, timeStamp}: Props) => {
  const temaConfig = chatTema ? getTemaConfig[chatTema] : null;
  console.log(JSON.stringify(temaConfig));

  useEffect(() => {
    console.log("First render, initializing...");
    chatbotUtils.clearSessionData();
    chatbotUtils.initOnOpenEvent();
  }, []);

  useEffect(() => {
    console.log("Chatbot update!");

    if (temaConfig === null) {
      return;
    }

    chatbotUtils.apneChatbot();
  }, [temaConfig]);

  return (
    temaConfig ?
    (
      <NAVChatBot
        configId={temaConfig.configId}
        queueKey={temaConfig.queueKey}
        customerKey={vars.chatBot.customerKey}
        key={timeStamp}
      />
    ) : null
  );
};

export default ChatbotWrapper;
