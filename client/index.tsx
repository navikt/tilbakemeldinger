import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { StoreProvider, useStore } from 'providers/Provider';
import { initialState, reducer } from 'providers/Store';
import { getLocaleFromUrl, setLocaleFromUrl } from 'utils/locale';
import { defaultLocale } from '#shared/locale.ts';
import { App } from './App';

import msgsNb from '#shared/language/nb.ts';
import msgsEn from '#shared/language/en.ts';
import msgsNn from '#shared/language/nn.ts';

const messages = {
	nb: msgsNb,
	en: msgsEn,
	nn: msgsNn,
};

type Props = {
	url?: string;
};

export const AppRoot = ({ url }: Props) => {
	useEffect(() => {
		if (import.meta.env.VITE_ENV === 'localhost') {
			import('./clients/apiMock').then(({ setUpMock }) => setUpMock());
		}
	}, []);

	const locale = url ? getLocaleFromUrl(url) : getLocaleFromUrl(window?.location?.pathname);

	const initialStateWithLocale = {
		...initialState,
		locale: locale || defaultLocale,
	};

	return (
		<StoreProvider initialState={initialStateWithLocale} reducer={reducer}>
			<RenderApp url={url} />
		</StoreProvider>
	);
};

const RenderApp = ({ url }: Props) => {
	const [{ locale }, dispatch] = useStore();

	useEffect(() => {
		setLocaleFromUrl(dispatch);
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('lang', locale);
	}, [locale]);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<App url={url} />
		</IntlProvider>
	);
};
