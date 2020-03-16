import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/tilbakemeldinger/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr, fetchAlerts, fetchFaq, fetchChannelInfo
} from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./components/error/Error";
import ServiceKlage from "./pages/tilbakemeldinger/service-klage/ServiceKlage";
import ServiceKlageLogin from "./pages/tilbakemeldinger/service-klage/ServiceKlageLogin";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import KontaktOssFrontpage from "./pages/kontakt-oss-frontpage/KontaktOss";
import SkrivTilOssRouter from "./pages/skriv-til-oss/SkrivTilOssRouter";
import BestillingAvSamtale from "./pages/samisk/bestilling-av-samtale/BestillingAvSamtale";
import { forsidePath, urls } from "./Config";
import ChatRouter from "./pages/chat/ChatRouter";
import FinnNavKontorPage from "./pages/finn-nav-kontor/FinnNavKontorPage";
import { FAQ } from "./utils/sanity/endpoints/faq";
import { Alert } from "./utils/sanity/endpoints/alert";
import { ChannelProps, Channels } from "./utils/sanity/endpoints/channel";

const App = () => {
  const [{auth}, dispatch] = useStore();

  useEffect(() => {
    if (!auth.authenticated) {
      fetchAuthInfo()
        .then((authInfo: AuthInfo) => {
          dispatch({type: "SETT_AUTH_RESULT", payload: authInfo});
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

    fetchAlerts()
      .then((alertsJson: Array<Alert>) => {
          dispatch({
            type: "SETT_VARSLER",
            payload: alertsJson
          });
        }
      )
      .catch(console.error);

    fetchFaq()
      .then((faqJson: Array<FAQ>) => {
          dispatch({
            type: "SETT_FAQ",
            payload: faqJson.sort((a, b) => b.priority - a.priority),
          });
        }
      )
      .catch(console.error);

    // TODO: legg på timeout
    fetchChannelInfo()
      .then((channels: Array<ChannelProps>) => {
          dispatch({
            type: "SETT_CHANNEL_PROPS",
            payload: {
              isLoaded: true,
              types: channels
                .reduce((acc, channel) => {
                  return {
                    ...acc,
                    [channel._id]: channel
                  };
                }, {})
            } as Channels
          });
        }
      )
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route
              exact={true}
              path={`(|${forsidePath})`}
              component={KontaktOssFrontpage}
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
              path={urls.finnDittNavKontorUinnlogget}
              component={FinnNavKontorPage}
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
            <Route component={PageNotFound}/>
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
};

export default App;
