import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import SkrivTilOssForside from "./SkrivTilOssForside";
import TemaArbeidssoker from "./IkkeIBruk/TemaArbeidssoker";
import TemaFamilieOgBarn from "./IkkeIBruk/TemaFamilieOgBarn";
import TemaHjelpemidler from "./IkkeIBruk/TemaHjelpemidler";
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
        path={urls.skrivTilOss.arbeidssoker}
      >
        <TemaArbeidssoker />
      </Route>
      <Route
        exact={true}
        path={urls.skrivTilOss.familieogbarn}
      >
        <TemaFamilieOgBarn />
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
