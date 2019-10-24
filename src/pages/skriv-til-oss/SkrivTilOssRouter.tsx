import React from "react";
import { Route, Switch } from "react-router";
import { urls } from "../../Config";

import SkrivTilOssForside from "./pages/SkrivTilOssForside";
import TemaArbeidssoker from "./pages/TemaArbeidssoker";
import TemaFamilieOgBarn from "./pages/TemaFamilieOgBarn";
import TemaHjelpemidler from "./pages/TemaHjelpemidler";

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
    </Switch>
  );
};

export default SkrivTilOssRouter;
