import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { vars, urls } from "../../Config";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";
import { getFeatureToggleStatus } from "../../utils/unleash";

import SkrivTilOssForside from "./pages/SkrivTilOssForside";
import TemaArbeidssoker from "./pages/TemaArbeidssoker";
import TemaFamilieOgBarn from "./pages/TemaFamilieOgBarn";
import TemaHjelpemidler from "./pages/TemaHjelpemidler";

const SkrivTilOssRouter = () => {
  const unleashCallback = (isEnabled: boolean, error?: any) => {
    setUnleashResponded(true);
    if (error) {
      console.log(`Unleash error: ${error}`);
      return;
    }
    setSkrivTilOssEnabled(isEnabled);
  };

  const [unleashResponded, setUnleashResponded] = useState(false);
  const [skrivTilOssEnabled, setSkrivTilOssEnabled] = useState(vars.unleash.skrivTilOssDefault);

  useEffect(() => {
    getFeatureToggleStatus(vars.unleash.skrivTilOssName, unleashCallback);
  });

  if (!unleashResponded) {
    return(<NavFrontendSpinner negativ={true} />);
  }

  if (!skrivTilOssEnabled) {
    return(
      <AlertStripe type="advarsel">
        {"Tjenesten er dessverre ikke tilgjengelig."}
      </AlertStripe>
    );
  }

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
