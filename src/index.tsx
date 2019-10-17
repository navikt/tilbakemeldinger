import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import NAVChatBot from "@navikt/nav-chatbot";
import withMenu from "./clients/apiMock/decorator/decorator-header-withmenu";
import megamenu from "./clients/apiMock/decorator/decorator-megamenu";
import footer from "./clients/apiMock/decorator/decorator-footer";
import scripts from "./clients/apiMock/decorator/decorator-scripts";
import skiplinks from "./clients/apiMock/decorator/decorator-skiplinks";
import styles from "./clients/apiMock/decorator/decorator-styles";
import { StoreProvider } from "./providers/Provider";
import { initialState, reducer } from "./providers/Store";

import msgsNb from "./language/nb";
import msgsEn from "./language/en";

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const defaultLang = "nb";
const messages = { nb: msgsNb, en: msgsEn };

const init = async () => {
  if (process.env.NODE_ENV === "development") {
    await import("./clients/apiMock").then(({ setUpMock }) => setUpMock());
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_HEADING}}}",
      withMenu
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_FOOTER}}}",
      footer
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_STYLES}}}",
      styles
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SCRIPTS}}}",
      scripts
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{NAV_SKIPLINKS}}}",
      skiplinks
    );
    document.body.innerHTML = document.body.innerHTML.replace(
      "{{{MEGAMENU_RESOURCES}}}",
      megamenu
    );
  }
  ReactDOM.render(
    <StoreProvider initialState={initialState} reducer={reducer}>
      <IntlProvider locale={defaultLang} messages={messages[defaultLang]}>
        <App />
      </IntlProvider>
      <NAVChatBot
        customerKey="12345"
        queueKey="Q_CHAT_BOT"
        configId={"c34298fe-3ea4-4d88-9343-c2d4e7bb3e10"}
        evaluationMessage={"Evaluering"}
      />
    </StoreProvider>,
    document.getElementById("app")
  );
  serviceWorker.unregister();
};
init();
