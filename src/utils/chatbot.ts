import { vars } from "../Config";

const storageKeys = {
  ...vars.chatBot.storageKeys,
  temp: "temp-storage",
};

// TODO: finn denne ut fra styled-components algoritme som genererer classnames
const getApneKnappClassName = () => {
  return "sc-fAjcbJ";
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

const apneChatbot = () => {
  const apneFunc = getApneFunc();

  if (!apneFunc) {
    return false;
  }

  apneFunc();
  return true;
};

const clearSessionData = () => {
  Object.entries(storageKeys).forEach(
    ([_, storageKey]) => sessionStorage.removeItem(storageKey)
  );
};

export default {
  apneChatbot,
  clearSessionData,
};
