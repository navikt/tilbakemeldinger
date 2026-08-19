import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { captureException, init as apmInit } from '@nais/apm';
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
import { env } from './env';

type Props = {
    url?: string;
};

// Every page is rendered once per locale. Keys are the localised path: unique,
// stable across renders, and readable in a component tree - unlike the index
// counter this replaced, whose numbers meant nothing and shifted if the list
// ever changed shape.
const PAGES = [
    { path: paths.tilbakemeldinger.forside, Component: Tilbakemeldinger },
    { path: paths.tilbakemeldinger.serviceklage.form, Component: ServiceKlage },
    { path: paths.tilbakemeldinger.rostilnav, Component: Ros },
    { path: paths.tilbakemeldinger.feilogmangler, Component: FeilOgMangler },
];

export const App = ({ url }: Props) => {
    const [{ auth }, dispatch] = useStore();

    useEffect(() => {
        apmInit({
            namespace: 'navno',
            app: 'tilbakemeldinger',
            telemetryUrl: env.VITE_TELEMETRY_URL,
        });
    }, []);

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
                        captureException(error, {
                            fingerprint: 'app.fetch-fodselsnr',
                            context: {
                                source: 'App',
                                action: 'fetchFodselsnr',
                            },
                        });
                    });

                fetchKontaktInfo()
                    .then((kontaktInfo: KontaktInfo) =>
                        dispatch({
                            type: 'SETT_KONTAKT_INFO_RESULT',
                            payload: kontaktInfo,
                        })
                    )
                    .catch((error: HTTPError) => {
                        console.error(error);
                        captureException(error, {
                            fingerprint: 'app.fetch-kontakt-info',
                            context: {
                                source: 'App',
                                action: 'fetchKontaktInfo',
                            },
                        });
                    });
            })
            .catch((error: HTTPError) => {
                console.error(error);
                captureException(error, {
                    fingerprint: 'app.fetch-auth-info',
                    context: { source: 'App', action: 'fetchAuthInfo' },
                });
            });
    }, [auth.authenticated, dispatch]);

    return (
        <>
            <DecoratorWidgets />
            <ScrollToTop>
                <Routes>
                    {validLocales.flatMap((locale) =>
                        PAGES.map(({ path, Component }) => {
                            const localisedPath = localePath(path, locale);
                            return (
                                <Route
                                    key={localisedPath}
                                    path={localisedPath}
                                    element={<Component />}
                                />
                            );
                        })
                    )}
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
