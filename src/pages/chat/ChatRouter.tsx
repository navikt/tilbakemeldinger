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
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default ChatRouter;
