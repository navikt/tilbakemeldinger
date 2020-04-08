import React from "react";
import { Route, Switch } from "react-router";
import { urls, useLocalePaths } from "../../Config";

import SkrivTilOssForside from "./sider/SkrivTilOssForside";
import TemaHjelpemidler from "./sider/TemaHjelpemidler";
import NotFound from "../404/404";

const SkrivTilOssRouter = () => {
  const paths = useLocalePaths();

  return (
    <Switch>
      <Route
        exact={true}
        path={paths.skrivTilOss.forside}
      >
        <SkrivTilOssForside />
      </Route>
      <Route
        exact={true}
        path={paths.skrivTilOss.hjelpemidler}
      >
        <TemaHjelpemidler />
      </Route>
      <Route>
        <NotFound/>
      </Route>
    </Switch>
  );
};

export default SkrivTilOssRouter;
