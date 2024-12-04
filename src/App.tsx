import React, { useEffect, useState } from 'react';
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

type Props = {
    url?: string;
};

const RedirectToNavno = () => {
    if (typeof window !== 'undefined') {
        window.location.href = 'https://www.nav.no';
    }

    return null;
};

export const App = ({ url }: Props) => {
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
                            element={<RedirectToNavno />}
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
                    <Route
                        path="*"
                        element={<RedirectToLocaleOrError url={url} />}
                    />
                </Routes>
            </ScrollToTop>
        </>
    );
};

const RedirectToLocaleOrError = ({ url }: Props) => {
    const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
    const currentUrl = url ?? window.location.pathname;
    const isLocaleUrl = currentUrl
        .split('/')
        .some((segment) => validLocales.some((locale) => segment === locale));

    useEffect(() => {
        setIsReadyToRedirect(true);
    }, []);

    if (!isReadyToRedirect) {
        return null;
    }

    if (!isLocaleUrl) {
        const subPath = currentUrl.split(paths.kontaktOss.forside)[1];
        return (
            <Navigate
                to={localePath(subPath || '', defaultLocale)}
                replace={true}
            />
        );
    }
    return <PageNotFound />;
};
