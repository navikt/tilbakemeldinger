import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/tilbakemeldinger/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import {
  fetchAuthInfo,
  fetchKontaktInfo,
  fetchFodselsnr, fetchAlerts, fetchFaq, fetchChannelInfo, timeoutPromise, fetchThemes, fetchTimeoutMs
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
import { FAQLenke } from "./utils/sanity/endpoints/faq";
import { Alert } from "./utils/sanity/endpoints/alert";
import { ChannelProps, ChannelList, createCompleteChannelList } from "./utils/sanity/endpoints/channels";
import { createCompleteThemeList, ThemeList, ThemeProps } from "./utils/sanity/endpoints/themes";

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

      fetchAlerts()
        .then((alerts: Array<Alert>) => {
            dispatch({
              type: "SETT_VARSLER",
              payload: alerts
            });
          }
        )
        .catch(console.error);

      Promise.race<any>([fetchFaq(), timeoutPromise(fetchTimeoutMs, "Fetching FAQs failed!")])
        .then((faq: Array<FAQLenke>) => {
          dispatch({
            type: "SETT_FAQ",
            payload: faq.sort((a, b) => b.priority - a.priority),
          });
        })
        .catch(err => {
          dispatch({ type: "SETT_FAQ_FETCH_FAILED" });
          console.error(err);
        });

      // TODO: vis varsel for teknisk feil hvis noe feiler her
      Promise.race<any>([fetchChannelInfo(), timeoutPromise(fetchTimeoutMs, "Fetching channel data failed!")])
        .then((channels: ChannelProps[]) => {
          dispatch({
            type: "SETT_CHANNEL_PROPS",
            payload: createCompleteChannelList(channels) as ChannelList
          });
        })
        .catch(err => {
          dispatch({ type: "SETT_CHANNELS_FETCH_FAILED" });
          console.error(err);
        });

      Promise.race<any>([fetchThemes(), timeoutPromise(fetchTimeoutMs, "Fetching theme data failed!")])
        .then((themes: ThemeProps[]) => {
          dispatch({
            type: "SETT_THEME_PROPS",
            payload: createCompleteThemeList(themes) as ThemeList
          });
        })
        .catch(err => {
          dispatch({ type: "SETT_THEMES_FETCH_FAILED" });
          console.error(err);
        });

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
              <Route component={PageNotFound} />
            </Switch>
          </ScrollToTop>
        </Router>
      </>
    );
  }
;

export default App;
