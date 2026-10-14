import React, { useEffect, useState } from 'react';
import { captureException, init as apmInit } from '@nais/apm';
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
import { paths } from '#shared/paths.ts';
import { parseAppPath } from '#shared/appPath.ts';
import { DecoratorWidgets } from '#client/components/decorator-widgets/DecoratorWidgets.tsx';
import '@navikt/ds-css';

const pages: Record<string, React.ComponentType> = {
	[paths.tilbakemeldinger.serviceklage.form]: ServiceKlage,
	[paths.tilbakemeldinger.feilogmangler]: FeilOgMangler,
	[paths.tilbakemeldinger.rostilnav]: Ros,
};

type Props = {
	url?: string;
};

export const App = ({ url }: Props) => {
	const [{ auth }, dispatch] = useStore();
	// A language switch changes the locale in the URL, never the page
	const [{ locale, page }] = useState(() => parseAppPath(url ?? window.location.pathname));
	const Page = (locale && pages[page]) || PageNotFound;

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

	return (
		<>
			<DecoratorWidgets />
			<Page />
		</>
	);
};
