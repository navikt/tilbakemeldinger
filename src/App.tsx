import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Tilbakemeldinger from "./pages/tilbakemeldinger/Tilbakemeldinger";
import Ros from "./pages/tilbakemeldinger/ros-til-nav/Ros";
import PageNotFound from "./pages/404/404";
import FeilOgMangler from "./pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import {
  fetchAuthInfo,
  fetchFodselsnr,
  fetchKontaktInfo,
} from "./clients/apiClient";
import { useStore } from "./providers/Provider";
import { AuthInfo } from "./types/authInfo";
import { HTTPError } from "./types/errors";
import ServiceKlage from "./pages/tilbakemeldinger/service-klage/ServiceKlage";
import { KontaktInfo } from "./types/kontaktInfo";
import { Fodselsnr } from "./types/fodselsnr";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import { forsidePath, paths } from "./Config";
import { defaultLocale, localePath, validLocales } from "./utils/locale";
import { DecoratorWidgets } from "./components/decorator-widgets/DecoratorWidgets";
import { Modal } from "@navikt/ds-react";
import "@navikt/ds-css";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const [{ auth }, dispatch] = useStore();

  useEffect(() => {
    Modal.setAppElement?.("#app");
  }, []);

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
                  payload: kontaktInfo,
                })
              )
              .catch((error: HTTPError) => console.error(error));
            fetchFodselsnr()
              .then((fodselsnr: Fodselsnr) =>
                dispatch({
                  type: "SETT_FODSELSNR",
                  payload: fodselsnr,
                })
              )
              .catch((error: HTTPError) => console.error(error));
          }
        })
        .catch((error: HTTPError) => console.error(error));
    }
  }, [auth.authenticated, dispatch]);

  let key = 0;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <DecoratorWidgets />
        <ScrollToTop>
          <Routes>
            {validLocales.flatMap((locale) => [
              <Route
                path={localePath(paths.tilbakemeldinger.forside, locale)}
                element={<Tilbakemeldinger />}
                key={key++}
              />,
              <Route
                path={localePath(
                  paths.tilbakemeldinger.serviceklage.login,
                  locale
                )}
                element={
                  <Navigate
                    to={localePath(
                      paths.tilbakemeldinger.serviceklage.form,
                      locale
                    )}
                  />
                }
                key={key++}
              />,
              <Route
                path={localePath(
                  paths.tilbakemeldinger.serviceklage.form,
                  locale
                )}
                element={<ServiceKlage />}
                key={key++}
              />,
              <Route
                path={localePath(paths.tilbakemeldinger.rostilnav, locale)}
                element={<Ros />}
                key={key++}
              />,
              <Route
                path={localePath(paths.tilbakemeldinger.feilogmangler, locale)}
                element={<FeilOgMangler />}
                key={key++}
              />,
            ])}
            <Route path="*" element={<RedirectToLocaleOrError />} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </HelmetProvider>
  );
};

const RedirectToLocaleOrError = () => {
  const isLocaleUrl = window.location.pathname
    .split("/")
    .some((segment) => validLocales.some((locale) => segment === locale));

  if (!isLocaleUrl) {
    const subPath = window.location.pathname.split(forsidePath)[1];
    return <Navigate to={localePath(subPath ? subPath : "", defaultLocale)} />;
  }
  return <PageNotFound />;
};

export default App;
