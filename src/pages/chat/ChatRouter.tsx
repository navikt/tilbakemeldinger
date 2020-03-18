import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import NotFound from "../404/404";
import ChatForside from "./ChatForside";
import { chatTemaLenker } from "./data/chatTemaLenker";
import ChatTemaside from "./ChatTemaside";
import { ChatTema } from "../../types/kanaler";

const ChatRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={urls.chat.forside}
        component={ChatForside}
      />
      {chatTemaLenker.map(lenke => (
        <Route
          exact={true}
          path={lenke.url}
          render={() => <ChatTemaside chatTema={lenke.tema as ChatTema} />}
          key={lenke.tema}
        />
      ))}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.arbeidsgiver.temaside}*/}
      {/*  component={ChatArbeidsgiver}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.jobbsoker.temaside}*/}
      {/*  component={ChatJobbsoker}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.syk.temaside}*/}
      {/*  component={ChatSyk}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.familie.temaside}*/}
      {/*  component={ChatFamilie}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.ufor.temaside}*/}
      {/*  component={ChatUfor}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.sosialhjelp.temaside}*/}
      {/*  component={ChatSosial}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.okonomi.temaside}*/}
      {/*  component={ChatOkonomi}*/}
      {/*/>*/}
      {/*<Route*/}
      {/*  exact={true}*/}
      {/*  path={urls.chat.eures.temaside}*/}
      {/*  component={ChatEURES}*/}
      {/*/>*/}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default ChatRouter;
