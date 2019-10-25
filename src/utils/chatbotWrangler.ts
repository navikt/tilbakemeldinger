// Wrangles the chatbot into doing your bidding!
// TODO:  - undersøk om det er nødvendig å implementere settTimerConfig funksjonen fra chatbot
//        - (og evt. gjør det)
//        - finn en måte å hooke axios.post på for å hindre doble kall mot puzzel api
//        - Hente filter strings fra Puzzel med configIds

import axios from "axios";
import moment from "moment";
import { ChatTema } from "../types/chat";
import { urls, vars } from "../Config";

type SessionConfig = {
  alive: number,
  requestId: number,
  sessionId: string,
  sessionIdPure: string,
};

type SessionCreate = {
  customerKey: string;
  queueKey: string;
  nickName: string;
  chatId: string;
  languageCode: string;
  denyArchiving: boolean;
  intro: SessionCreateIntro;
  myFlag?: boolean;
};

type SessionCreateIntro = {
  isMobile?: boolean;
  variables?: { [key: string]: string };
  msgWelcomeHeader?: string;
  msgWelcome?: string;
  msgWelcomeEmpty?: string;
  msgWelcomePause?: string;
  msgWelcomeFull?: string;
  msgReject?: string;
  showIpAddress?: boolean;
  showNumberInQueue?: boolean;
  showAgentLoggedOn?: boolean;
  showAgentActive?: boolean;
  showVariables?: boolean;
  showIsMobile?: boolean;
};

type SessionCreateResponse = {
  iqSessionId: string;
  requestId: number;
};

const sessionConfigApiUrl = urls.chatBotApi.sessionConfig;
const queueKeyBot = vars.chatBot.queueKeyBot;
const customerKey = vars.chatBot.customerKey;
const configIdsForTema = vars.chatBot.configIds;

const temaFilters: {[key in ChatTema]: string} = {
  [ChatTema.AAP]: "filter.AAP",
  [ChatTema.Familie]: "filter.Familie",
  [ChatTema.Sosial]: "filter.Sosial",
  [ChatTema.Okonomi]: "filter.Okonomi",
};

const chatbotConfigStorageKey = "chatbot-frida_config";
const tempStorageKey = "temp-storage";

const getConfigRequestDataForTema = (tema: ChatTema): SessionCreate => ({
  customerKey: customerKey,
  queueKey: queueKeyBot,
  nickName: "Bruker",
  chatId: "bruker@customer.com",
  languageCode: "no",
  denyArchiving: false,
  intro: {
    variables: {
      FILTER: temaFilters[tema],
    },
  },
  myFlag: true,
});

// TODO: finn denne ut fra styled-components algoritme som genererer classnames
const getApneKnappClassName = () => {
  return "sc-fAjcbJ jPeQQL";
};

const getApneFunc = () => {
  const apneKnappClassName = getApneKnappClassName();
  const apneKnapper = document.getElementsByClassName(apneKnappClassName);
  const apneKnapp = (apneKnapper && apneKnapper.length > 0) && (apneKnapper[0] as HTMLElement);
  return apneKnapp && apneKnapp.click.bind(apneKnapp);
};

const fetchConfigForTema = async (tema: ChatTema) => {
  const session = await axios.post(sessionConfigApiUrl, getConfigRequestDataForTema(tema));

  const responseData = session.data as SessionCreateResponse;
  const config: SessionConfig = {
    sessionId: `${customerKey}-${responseData.iqSessionId}`,
    sessionIdPure: responseData.iqSessionId,
    requestId: responseData.requestId,
    alive: moment(new Date())
      .add(2, "hours")
      .valueOf()
  };

  return config;
};

const sessionStorageEventListener = (event: Event) => {
  const storageKey = (event as CustomEvent).detail.key;
  if (storageKey !== chatbotConfigStorageKey) {
    return;
  }

  window.removeEventListener("sessionStorageSet", sessionStorageEventListener);

  const temaSpesifikkConfig = sessionStorage.getItem(tempStorageKey);
  if (temaSpesifikkConfig) {
    sessionStorage.setItem(chatbotConfigStorageKey, temaSpesifikkConfig);
  }
};

const hookSessionStorageSetItemFunc = () => {
  const setItemReal = sessionStorage.setItem.bind(sessionStorage);

  sessionStorage.setItem = (key: string, value: string) => {
    setItemReal(key, value);
    window.dispatchEvent(
      new CustomEvent("sessionStorageSet", {detail: {key: key, value: value}}));
  };
};

const apneChatbotForTema = async (temaKode: ChatTema) => {
  const apneFunc = getApneFunc();

  if (!apneFunc) {
    console.log("Error: chatbot åpne funksjon ble ikke funnet. Chatbot ikke mounted eller allerede åpnet?");
    return;
  }

  await fetchConfigForTema(temaKode)
    .then(res => {
      sessionStorage.setItem(tempStorageKey, JSON.stringify(res));
    })
    .catch((e) => {
      console.log("Error fetching chatbot config: " + e);
      return;
    });

  hookSessionStorageSetItemFunc();
  window.addEventListener("sessionStorageSet", sessionStorageEventListener);
  apneFunc();
};

export default {
  apneChatbotForTema
};
