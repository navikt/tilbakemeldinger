import { useEffect, useState } from 'react';
import { captureException } from '@nais/apm';
import PageNotFound from '#client/pages/404/404.tsx';
import { findPage } from '#client/pages/pages.ts';
import { fetchAuthInfo, fetchFodselsnr, fetchKontaktInfo } from '#client/clients/apiClient.ts';
import { useStore } from '#client/providers/Provider.tsx';
import { AuthInfo } from '#client/types/authInfo.ts';
import { errorContext } from '#client/types/errors.ts';
import { KontaktInfo } from '#client/types/kontaktInfo.ts';
import { Fodselsnr } from '#client/types/fodselsnr.ts';
import { DecoratorWidgets } from '#client/components/decorator-widgets/DecoratorWidgets.tsx';
import { MetaTags } from '#client/components/metatags/MetaTags.tsx';
import '@navikt/ds-css';

type Props = {
	url?: string;
};

export const App = ({ url }: Props) => {
	const [{ auth }, dispatch] = useStore();
	// A language switch changes the locale in the URL, never the page
	const [page] = useState(() => findPage(url ?? window.location.pathname));
	const Page = page?.component ?? PageNotFound;

	useEffect(() => {
		if (auth.authenticated) {
			return;
		}

		const report = (fingerprint: string, action: string) => (error: unknown) => {
			console.error(error);
			captureException(error, { fingerprint, context: { source: 'App', action, ...errorContext(error) } });
		};

		const loadUser = async () => {
			const authInfo: AuthInfo = await fetchAuthInfo();
			dispatch({ type: 'SETT_AUTH_RESULT', payload: authInfo });
			if (!authInfo.authenticated) {
				return;
			}

			// One failing doesn't stop the other
			await Promise.all([
				fetchFodselsnr()
					.then((fodselsnr: Fodselsnr) => dispatch({ type: 'SETT_FODSELSNR', payload: fodselsnr }))
					.catch(report('app.fetch-fodselsnr', 'fetchFodselsnr')),
				fetchKontaktInfo()
					.then((kontaktInfo: KontaktInfo) => dispatch({ type: 'SETT_KONTAKT_INFO_RESULT', payload: kontaktInfo }))
					.catch(report('app.fetch-kontakt-info', 'fetchKontaktInfo')),
			]);
		};

		loadUser().catch(report('app.fetch-auth-info', 'fetchAuthInfo'));
	}, [auth.authenticated, dispatch]);

	return (
		<>
			<DecoratorWidgets />
			{page && <MetaTags page={page} />}
			<Page />
		</>
	);
};
