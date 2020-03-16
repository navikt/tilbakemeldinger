import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import NotFound from "../404/404";
import ChatFamilie from "./temasider/ChatFamilie";
import ChatForside from "./ChatForside";
import ChatJobbsoker from "./temasider/ChatJobbsoker";
import ChatSosial from "./temasider/ChatSosial";
import ChatOkonomi from "./temasider/ChatOkonomi";
import ChatEURES from "./temasider/ChatEures";
import ChatSyk from "./temasider/ChatSyk";
import ChatUfor from "./temasider/ChatUfor";
import ChatArbeidsgiver from "./temasider/ChatArbeidsgiver";

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
        path={urls.chat.arbeidsgiver.temaside}
        component={ChatArbeidsgiver}
      />
      <Route
        exact={true}
        path={urls.chat.jobbsoker.temaside}
        component={ChatJobbsoker}
      />
      <Route
        exact={true}
        path={urls.chat.syk.temaside}
        component={ChatSyk}
      />
      <Route
        exact={true}
        path={urls.chat.familie.temaside}
        component={ChatFamilie}
      />
      <Route
        exact={true}
        path={urls.chat.ufor.temaside}
        component={ChatUfor}
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
        <NotFound />
      </Route>
    </Switch>
  );
};

export default ChatRouter;
