import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import NotFound from "../404/404";
import ChatFamilie from "./sider/ChatFamilie";
import ChatForside from "./sider/ChatForside";
import ChatJobbsoker from "./sider/ChatJobbsoker";
import ChatAAP from "./sider/ChatAap";
import ChatSosial from "./sider/ChatSosial";
import ChatOkonomi from "./sider/ChatOkonomi";
import ChatEURES from "./sider/ChatEures";

const ChatRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={urls.chat.forside}
        component={ChatForside}
      />
      <Route
        exact={true}
        path={urls.chat.jobbsoker.temaside}
        component={ChatJobbsoker}
      />
      <Route
        exact={true}
        path={urls.chat.aap.temaside}
        component={ChatAAP}
      />
      <Route
        exact={true}
        path={urls.chat.familie.temaside}
        component={ChatFamilie}
      />
      <Route
        exact={true}
        path={urls.chat.sosialhjelp.temaside}
        component={ChatSosial}
      />
      <Route
        exact={true}
        path={urls.chat.okonomi.temaside}
        component={ChatOkonomi}
      />
      <Route
        exact={true}
        path={urls.chat.eures.temaside}
        component={ChatEURES}
      />
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
};

export default ChatRouter;
