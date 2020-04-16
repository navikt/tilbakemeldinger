import React from "react";
import { Route, Switch } from "react-router";
import NotFound from "../404/404";
import ChatForside from "./ChatForside";
import { chatTemaLenker } from "./data/chatTemaLenker";
import ChatTemaside from "./ChatTemaside";
import { ChatTema } from "../../types/kanaler";
import { localePath } from "../../utils/locale";
import { useLocalePaths } from "../../Config";
import { useStore } from "../../providers/Provider";

const ChatRouter = () => {
  const paths = useLocalePaths();
  const [{ locale }] = useStore();

  return (
    <Switch>
      <Route
        exact={true}
        path={paths.chat.forside}
        component={ChatForside}
      />
      {chatTemaLenker.map(lenke => (
        <Route
          exact={true}
          path={localePath(lenke.url, locale)}
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
