import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import AlertStripe from "nav-frontend-alertstriper";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/tilbakemeldinger/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr
} from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./components/error/Error";
import ServiceKlage from "./pages/tilbakemeldinger/service-klage/ServiceKlage";
import ServiceKlageLogin from "./pages/tilbakemeldinger/service-klage/ServiceKlageLogin";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTopp";
import KontaktOssFrontpage from "./pages/kontakt-oss-frontpage/KontaktOss";
import SkrivTilOssRouter from "./pages/skriv-til-oss/SkrivTilOssRouter";
import Unleash from "./utils/unleash";
import BestillingAvSamtale from "./pages/samisk/bestilling-av-samtale/BestillingAvSamtale";
import { urls, vars } from "./Config";
import ChatRouter from "./pages/chat/ChatRouter";
import NavFrontendSpinner from "nav-frontend-spinner";

const RedirectTilGammel = () => {
  window.location.replace(urls.gamleKontaktOss);
  return null;
};

const App = () => {
  const [{ auth }, dispatch] = useStore();
  const [tekniskProblem, setTekniskProblem] = useState(false);
  const [redirectTilGammel, setRedirectTilGammel] = useState (false);
  const [unleashResponded, setUnleashResponded] = useState(false);

  useEffect(() => {
    if (!auth.authenticated) {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo });
          if (authInfo.authenticated) {
            fetchKontaktInfo()
              .then((kontaktInfo: KontaktInfo) =>
                dispatch({
                  type: "SETT_KONTAKT_INFO_RESULT",
                  payload: kontaktInfo
                })
              )
              .catch((error: HTTPError) => console.error(error));
            fetchFodselsnr()
              .then((fodselsnr: Fodselsnr) =>
                dispatch({
                  type: "SETT_FODSELSNR",
                  payload: fodselsnr
                })
              )
              .catch((error: HTTPError) => console.error(error));
          }
        })
        .catch((error: HTTPError) => console.error(error));
    }

    const tekniskProblemFeature = vars.unleash.tekniskProblemName;
    const redirectFeature = vars.unleash.redirect;

    Unleash.getFeatureToggleStatusMultiple(
      [tekniskProblemFeature, redirectFeature],
      (features, error) => {
        setUnleashResponded(true);
        if (error) {
          console.log(`Unleash error: ${error}`);
          setTekniskProblem(vars.unleash.tekniskProblemDefault);
          setRedirectTilGammel(vars.unleash.redirectDefault);
          return;
        }
        setTekniskProblem(features[tekniskProblemFeature]);
        setRedirectTilGammel(features[redirectFeature]);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!unleashResponded) {
    return <NavFrontendSpinner />;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const noredir = urlParams.get("noredir") === "true" || !redirectTilGammel;

  return (
    <>
      {tekniskProblem && (
        <AlertStripe type="feil" className="teknisk-problem-stripe">
          <FormattedMessage id="teknisk-problem" />
        </AlertStripe>
      )}
      <Router>
        <ScrollToTop>
          <Switch>
            <Route
              exact={true}
              path={`(|${urls.forside})`}
              component={noredir ? KontaktOssFrontpage : RedirectTilGammel}
            />
            <Route
              exact={false}
              path={urls.skrivTilOss.forside}
              component={SkrivTilOssRouter}
            />
            <Route
              exact={false}
              path={urls.chat.forside}
              component={ChatRouter}
            />
            <Route
              exact={true}
              path={urls.tilbakemeldinger.forside}
              component={Tilbakemeldinger}
            />
            <Route
              exact={true}
              path={urls.tilbakemeldinger.serviceklage.login}
              component={ServiceKlageLogin}
            />
            <Route
              exact={true}
              path={urls.tilbakemeldinger.serviceklage.form}
              component={ServiceKlage}
            />
            <Route
              exact={true}
              path={urls.tilbakemeldinger.rostilnav}
              component={Ros}
            />
            <Route
              exact={true}
              path={urls.tilbakemeldinger.feilogmangler}
              component={FeilOgMangler}
            />
            <Route
              exact={true}
              path={urls.samegiella.base}
              render={() => (window.location.href = urls.samegiella.redirect)}
            />
            <Route
              exact={true}
              path={urls.samegiella.samtale}
              component={BestillingAvSamtale}
            />
            <Route component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
};

export default App;
