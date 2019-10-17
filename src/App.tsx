import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import Takk from "./pages/tilbakemeldinger/takk/Takk";
import ServiceKlage from "./pages/tilbakemeldinger/service-klage/ServiceKlage";
import Login from "./pages/tilbakemeldinger/service-klage/Login";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTopp";

import { urls } from "./Config";

import KontaktOssFrontpage from "./pages/kontakt-oss-frontpage/KontaktOss";
import SkrivTilOssRouter from "./pages/skriv-til-oss/SkrivTilOssRouter";

const App = () => {
  const [{ auth }, dispatch] = useStore();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route
            exact={true}
            path={`(|${urls.forside})`}
            component={KontaktOssFrontpage}
          />
          <Route
            exact={false}
            path={urls.skrivTilOss.forside}
            component={SkrivTilOssRouter}
          />
          <Route
            exact={true}
            path={urls.tilbakemeldinger.forside}
            component={Tilbakemeldinger}
          />
          <Route
            exact={true}
            path={urls.tilbakemeldinger.serviceklage.login}
            component={Login}
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
            path={`(|${urls.tilbakemeldinger})/(ros-til-nav|feil-og-mangler|serviceklage)/takk`}
            component={Takk}
          />
          <Route component={PageNotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
