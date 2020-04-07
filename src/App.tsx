import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
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

      Promise.race<any>([fetchAlerts(), timeoutPromise(fetchTimeoutMs, "Fetching alerts failed!")])
        .then((alerts: Array<Alert>) => {
          dispatch({
            type: "SETT_ALERTS",
            payload: alerts
          });
        })
        .catch(err => {
          dispatch({ type: "SETT_ALERTS_FETCH_FAILED" });
          console.error(err);
        });

      Promise.race<any>([fetchFaq(), timeoutPromise(fetchTimeoutMs, "Fetching FAQs failed!")])
        .then((faq: Array<FAQLenke>) => {
          dispatch({
            type: "SETT_FAQ",
            payload: faq
          });
        })
        .catch(err => {
          dispatch({ type: "SETT_FAQ_FETCH_FAILED" });
          console.error(err);
        });

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
        <ScrollToTop>
          <Switch>
            {["", "/nb", "/en"].flatMap(locale => {
              let key = 0;
              return [
                (
                  <Route
                    exact={true}
                    path={`${locale}${forsidePath}`}
                    component={KontaktOssFrontpage}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={false}
                    path={urls.skrivTilOss.forside}
                    component={SkrivTilOssRouter}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={false}
                    path={urls.chat.forside}
                    component={ChatRouter}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.finnNavKontor.finnDittNavKontorUinnlogget}
                    component={FinnNavKontorPage}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.tilbakemeldinger.forside}
                    component={Tilbakemeldinger}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.tilbakemeldinger.serviceklage.login}
                    component={ServiceKlageLogin}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.tilbakemeldinger.serviceklage.form}
                    component={ServiceKlage}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.tilbakemeldinger.rostilnav}
                    component={Ros}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.tilbakemeldinger.feilogmangler}
                    component={FeilOgMangler}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.samegiella.base}
                    render={() => (window.location.href = urls.samegiella.redirect)}
                    key={key++}
                  />
                ),
                (
                  <Route
                    exact={true}
                    path={urls.samegiella.samtale}
                    component={BestillingAvSamtale}
                    key={key++}
                  />
                )];
            })}
            <Route component={PageNotFound} />
          </Switch>
        </ScrollToTop>
      </>
    );
  }
;

export default App;
