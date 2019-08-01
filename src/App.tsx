import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Frontpage from "./pages/frontpage/Frontpage";
import Header from "./components/header/Header";
import Ros from "./pages/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/feil-og-mangler/FeilOgMangler";
import { fetchAuthInfo } from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./components/error/Error";
import Takk from "./pages/takk/Takk";
import ServiceKlage from "./pages/service-klage/ServiceKlage";
import Login from "./pages/service-klage/Login";

export const baseUrl = "/person/tilbakemeldinger";
const App = () => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    if (!auth.authenticated)
      fetchAuthInfo()
        .then((authInfo: AuthInfo) =>
          dispatch({ type: "SETT_AUTH_RESULT", payload: authInfo })
        )
        .catch((error: HTTPError) => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <div className="pagecontent">
        <Switch>
          <Route exact path={`(|${baseUrl})`} component={Frontpage} />
          <Route
            exact
            path={`${baseUrl}/service-klage/login`}
            component={Login}
          />
          <Route
            exact
            path={`${baseUrl}/service-klage`}
            component={ServiceKlage}
          />
          <Route exact path={`${baseUrl}/ros-til-nav`} component={Ros} />
          <Route
            exact
            path={`${baseUrl}/feil-og-mangler`}
            component={FeilOgMangler}
          />
          <Route
            exact
            path={`(|${baseUrl})/(ros-til-nav|feil-og-mangler)/takk`}
            component={Takk}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
