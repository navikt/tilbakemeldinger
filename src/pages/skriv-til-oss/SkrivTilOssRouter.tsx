import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import SkrivTilOssForside from "./sider/SkrivTilOssForside";
import TemaHjelpemidler from "./sider/TemaHjelpemidler";
import NotFound from "../404/404";

const SkrivTilOssRouter = () => {
  return (
    <Switch>
      <Route
        exact={true}
        path={urls.skrivTilOss.forside}
      >
        <SkrivTilOssForside />
      </Route>
      <Route
        exact={true}
        path={urls.skrivTilOss.hjelpemidler}
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
