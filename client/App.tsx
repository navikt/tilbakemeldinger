import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { captureException, init as apmInit } from '@nais/apm';
import Tilbakemeldinger from '#client/pages/tilbakemeldinger/Tilbakemeldinger.tsx';
import Ros from '#client/pages/tilbakemeldinger/ros-til-nav/Ros.tsx';
import PageNotFound from '#client/pages/404/404.tsx';
import FeilOgMangler from '#client/pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler.tsx';
import { fetchAuthInfo, fetchFodselsnr, fetchKontaktInfo } from '#client/clients/apiClient.ts';
import { useStore } from '#client/providers/Provider.tsx';
import { AuthInfo } from '#client/types/authInfo.ts';
import { HTTPError } from '#client/types/errors.ts';
import ServiceKlage from '#client/pages/tilbakemeldinger/service-klage/ServiceKlage.tsx';
import { KontaktInfo } from '#client/types/kontaktInfo.ts';
import { Fodselsnr } from '#client/types/fodselsnr.ts';
import ScrollToTop from '#client/components/scroll-to-top/ScrollToTop.tsx';
import { paths } from '#shared/paths.ts';
import { localePath } from '#client/utils/locale.ts';
import { defaultLocale, validLocales } from '#shared/locale.ts';
import { DecoratorWidgets } from '#client/components/decorator-widgets/DecoratorWidgets.tsx';
import '@navikt/ds-css';

type Props = {
	url?: string;
};

export const App = ({ url }: Props) => {
	const [{ auth }, dispatch] = useStore();

	useEffect(() => {
		apmInit({
			namespace: 'navno',
			app: 'tilbakemeldinger',
			telemetryUrl: import.meta.env.VITE_TELEMETRY_URL,
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

	let key = 0;

	return (
		<>
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
							path={localePath(paths.tilbakemeldinger.serviceklage.form, locale)}
							element={<ServiceKlage />}
							key={key++}
						/>,
						<Route path={localePath(paths.tilbakemeldinger.rostilnav, locale)} element={<Ros />} key={key++} />,
						<Route
							path={localePath(paths.tilbakemeldinger.feilogmangler, locale)}
							element={<FeilOgMangler />}
							key={key++}
						/>,
					])}
					<Route path="*" element={<RedirectToLocaleOrError url={url} />} />
				</Routes>
			</ScrollToTop>
		</>
	);
};

const RedirectToLocaleOrError = ({ url }: Props) => {
	const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);
	const currentUrl = url ?? window.location.pathname;
	const isLocaleUrl = currentUrl.split('/').some((segment) => validLocales.some((locale) => segment === locale));

	useEffect(() => {
		setIsReadyToRedirect(true);
	}, []);

	if (!isReadyToRedirect) {
		return null;
	}

	if (!isLocaleUrl) {
		const subPath = currentUrl.split(paths.kontaktOss.forside)[1];
		return <Navigate to={localePath(subPath || '', defaultLocale)} replace={true} />;
	}
	return <PageNotFound />;
};
