import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/feil-og-mangler/FeilOgMangler";
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr
} from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./components/error/Error";
import Takk from "./pages/takk/Takk";
import ServiceKlage from "./pages/service-klage/ServiceKlage";
import Login from "./pages/service-klage/Login";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTopp";
import KontaktOssFrontpage from "./pages/kontakt-oss-frontpage/KontaktOssFrontpage";

export const baseUrl = "/person/kontakt-oss";
export const tilbakemeldingerUrl = `${baseUrl}/tilbakemeldinger`;

// TODO: Implementer nested routing med separate filer/komponenter for hver hovedside

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
            path={`(|${baseUrl})`}
            component={KontaktOssFrontpage}
          />
          <Route
            exact={true}
            path={`${tilbakemeldingerUrl}`}
            component={Tilbakemeldinger}
          />
          <Route
            exact={true}
            path={`${tilbakemeldingerUrl}/serviceklage/login`}
            component={Login}
          />
          <Route
            exact={true}
            path={`${tilbakemeldingerUrl}/serviceklage`}
            component={ServiceKlage}
          />
          <Route
            exact={true}
            path={`${tilbakemeldingerUrl}/ros-til-nav`}
            component={Ros}
          />
          <Route
            exact={true}
            path={`${tilbakemeldingerUrl}/feil-og-mangler`}
            component={FeilOgMangler}
          />
          <Route
            exact={true}
            path={`(|${tilbakemeldingerUrl})/(ros-til-nav|feil-og-mangler|serviceklage)/takk`}
            component={Takk}
          />
          <Route component={PageNotFound} />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

export default App;
