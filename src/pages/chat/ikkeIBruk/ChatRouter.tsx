import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../../Config";

import NotFound from "../../404/404";
import ChatSide from "../ChatSide";
import ChatFamilie from "./ChatFamilie";

const ChatRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={urls.chat.forside}
      >
        <ChatSide />
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
