import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../../Config";

import NotFound from "../../404/404";
import ChatForside from "../pages/ChatForside";
import ChatFamilie from "./ChatFamilie";

const ChatRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={urls.chat.forside}
      >
        <ChatForside />
      </Route>
      <Route
        exact={true}
        path={urls.chat.familie}
      >
        <ChatFamilie />
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
};

export default ChatRouter;
