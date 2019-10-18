import React from "react";
import { Route, Switch } from "react-router";
import { vars, urls } from "../../Config";
import { fetchUnleashToggleStatus } from "../../utils/unleash";

import SkrivTilOssForside from "./pages/SkrivTilOssForside";
import TemaArbeidssoker from "./pages/TemaArbeidssoker";
import TemaFamilieOgBarn from "./pages/TemaFamilieOgBarn";
import TemaHjelpemidler from "./pages/TemaHjelpemidler";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";

const featureToggleName = "kontakt-oss.skriv-til-oss";

class SkrivTilOssRouter extends React.Component {
  state = { isEnabled: vars.skrivTilOssToggleDefault, unleashResponded: false };

  componentDidMount() {
    fetchUnleashToggleStatus(featureToggleName, this.unleashCallback.bind(this));
  }

  unleashCallback(isEnabled: boolean, error?: any) {
    this.setState({unleashResponded: true});
    if (error) {
      console.log(`Unleash error: ${error}`);
      return;
    }

    this.setState({ isEnabled });
  }

  render() {
    if (!this.state.unleashResponded) {
      return(<NavFrontendSpinner negativ={true} />);
    }

    if (!this.state.isEnabled) {
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
  }
}

export default SkrivTilOssRouter;
