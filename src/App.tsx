import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Tilbakemeldinger from 'pages/tilbakemeldinger/Tilbakemeldinger';
import Ros from 'pages/tilbakemeldinger/ros-til-nav/Ros';
import PageNotFound from 'pages/404/404';
import FeilOgMangler from 'pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler';
import {
    fetchAuthInfo,
    fetchFodselsnr,
    fetchKontaktInfo,
} from 'clients/apiClient';
import { useStore } from 'providers/Provider';
import { AuthInfo } from 'types/authInfo';
import { HTTPError } from 'types/errors';
import ServiceKlage from 'pages/tilbakemeldinger/service-klage/ServiceKlage';
import { KontaktInfo } from 'types/kontaktInfo';
import { Fodselsnr } from 'types/fodselsnr';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import { paths } from 'common/paths';
import { localePath } from 'utils/locale';
import { defaultLocale, validLocales } from 'common/locale';
import { DecoratorWidgets } from 'components/decorator-widgets/DecoratorWidgets';
import '@navikt/ds-css';

export const App = () => {
    const [{ auth }, dispatch] = useStore();

    useEffect(() => {
        if (auth.authenticated) {
            return;
        }

        fetchAuthInfo()
            .then((authInfo: AuthInfo) => {
                dispatch({ type: 'SETT_AUTH_RESULT', payload: authInfo });
                if (!authInfo.authenticated) {
                    return;
                }

                fetchFodselsnr()
                    .then((fodselsnr: Fodselsnr) =>
                        dispatch({
                            type: 'SETT_FODSELSNR',
                            payload: fodselsnr,
                        })
                    )
                    .catch((error: HTTPError) => {
                        console.error(error);
                    });

                fetchKontaktInfo()
                    .then((kontaktInfo: KontaktInfo) =>
                        dispatch({
                            type: 'SETT_KONTAKT_INFO_RESULT',
                            payload: kontaktInfo,
                        })
                    )
                    .catch((error: HTTPError) => console.error(error));
            })
            .catch((error: HTTPError) => console.error(error));
    }, [auth.authenticated, dispatch]);

    let key = 0;

    return (
        <>
            <DecoratorWidgets />
            <ScrollToTop>
                <Routes>
                    {validLocales.flatMap((locale) => [
                        <Route
                            path={localePath(
                                paths.tilbakemeldinger.forside,
                                locale
                            )}
                            element={<Tilbakemeldinger />}
                            key={key++}
                        />,
                        <Route
                            path={paths.tilbakemeldinger.forside}
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
                                        paths.tilbakemeldinger.serviceklage
                                            .form,
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
                            path={localePath(
                                paths.tilbakemeldinger.rostilnav,
                                locale
                            )}
                            element={<Ros />}
                            key={key++}
                        />,
                        <Route
                            path={localePath(
                                paths.tilbakemeldinger.feilogmangler,
                                locale
                            )}
                            element={<FeilOgMangler />}
                            key={key++}
                        />,
                    ])}
                    {/* Define non-locale specific routes */}
                    <Route
                        path={paths.tilbakemeldinger.forside}
                        element={<Tilbakemeldinger />}
                    />
                    <Route
                        path={paths.tilbakemeldinger.serviceklage.login}
                        element={
                            <Navigate
                                to={paths.tilbakemeldinger.serviceklage.form}
                            />
                        }
                    />
                    <Route
                        path={paths.tilbakemeldinger.serviceklage.form}
                        element={<ServiceKlage />}
                    />
                    <Route
                        path={paths.tilbakemeldinger.rostilnav}
                        element={<Ros />}
                    />
                    <Route
                        path={paths.tilbakemeldinger.feilogmangler}
                        element={<FeilOgMangler />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </ScrollToTop>
        </>
    );
};
