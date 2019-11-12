import { vars } from "../Config";

const storageKeys = {
  config: vars.chatBot.storageKeys.config,
  openState: vars.chatBot.storageKeys.openState,
  history: vars.chatBot.storageKeys.history,
  temp: "temp-storage",
};

const hookSessionStorageSetItem = (storageKey: string) => {
  const setItemReal = sessionStorage.setItem.bind(sessionStorage);

  sessionStorage.setItem = (key: string, value: string) => {
    setItemReal(key, value);
    window.dispatchEvent(
      new CustomEvent(`sessionStorageSet_${storageKey}`, {detail: {key: key, value: value}}));
  };
};

const initEventDispatcherHooks = () => {
  hookSessionStorageSetItem(storageKeys.openState);
};

// TODO: finn denne ut fra styled-components algoritme som genererer classnames
const getApneKnappClassName = () => {
  return "sc-fAjcbJ";
};

const getLukkKnappClassName = () => {
  return "sc-bxivhb";
};

const getClickFunc = (className: string) => {
  const buttons = document.getElementsByClassName(className);
  const button = (buttons && buttons.length > 0) && (buttons[0] as HTMLElement);

  if (button) {
    return button.click.bind(button);
  }

  return null;
};

const getApneFunc = () => {
  return getClickFunc(getApneKnappClassName());
};

const getLukkFunc = () => {
  return getClickFunc(getLukkKnappClassName());
};

const reOpenOnClose = (event: Event) => {
  const storageElement = (event as CustomEvent).detail;
  if (storageElement.key !== vars.chatBot.storageKeys.openState) {
    return;
  }

  window.removeEventListener(`sessionStorageSet_${storageKeys.openState}`, reOpenOnClose);
  const isOpen = storageElement.value === "true";
  if (!isOpen) {
    console.log("Chatbot er lukket, gjenåpner...");
    const apneFunc = getApneFunc();

    if (!apneFunc) {
      console.log("Åpne funksjon fortsatt IKKE funnet");
      return;
    }

    console.log("Fant åpne funksjon denne gangen, kjører...");
    clearSessionData();
    apneFunc();
  }
};

const lukkOgApneChatbot = () => {
  const lukkFunc = getLukkFunc();
  if (!lukkFunc) {
    console.log("Kan ikke lukke og reåpne");
    return false;
  }

  window.addEventListener(`sessionStorageSet_${storageKeys.openState}`, reOpenOnClose);
  lukkFunc();
  return true;
};

const apneChatbot = () => {
  const apneFunc = getApneFunc();

  if (!apneFunc) {
    console.log("Åpne funksjon IKKE funnet");
    // lukkOgApneChatbot();
    return false;
  }

  console.log("Fant åpne funksjon, kjører...");
  // clearSessionData();
  apneFunc();
  return true;
};

const lukkChatbot = () => {
  const lukkFunc = getLukkFunc();

  if (!lukkFunc) {
    console.log("Lukk funksjon IKKE funnet");
    return false;
  }

  console.log("Fant lukk funksjon, kjører...");
  clearSessionData();
  lukkFunc();
  return true;
};

const clearSessionData = () => {
  Object.entries(storageKeys).forEach(([_, storageKey]) => sessionStorage.removeItem(storageKey));
};

export default {
  apneChatbot,
  lukkChatbot,
  lukkOgApneChatbot,
  initEventDispatcherHooks,
  clearSessionData,
};
