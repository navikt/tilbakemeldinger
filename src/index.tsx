import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { StoreProvider, useStore } from 'providers/Provider';
import { initialState, reducer } from 'providers/Store';
import { setLocaleFromUrl } from 'utils/locale';
import { App } from './App';

import msgsNb from '../common/language/nb';
import msgsEn from '../common/language/en';
import msgsNn from '../common/language/nn';

const messages = {
    nb: msgsNb,
    en: msgsEn,
    nn: msgsNn,
};

export const AppRoot = () => {
    //TODO uncomment igjen?
    // useEffect(() => {
    //     if (import.meta.env.VITE_ENV === 'localhost') {
    //         import('./clients/apiMock').then(({ setUpMock }) => setUpMock());
    //     }
    // }, []);

    return (
        <StoreProvider initialState={initialState} reducer={reducer}>
            <RenderApp />
        </StoreProvider>
    );
};

const RenderApp = () => {
    const [{ locale }, dispatch] = useStore();

    useEffect(() => {
        setLocaleFromUrl(dispatch);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('lang', locale);
    }, [locale]);

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <App />
        </IntlProvider>
    );
};
