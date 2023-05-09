import './polyfills';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import { StoreProvider, useStore } from './providers/Provider';
import { initialState, reducer } from './providers/Store';
import { setLocaleFromUrl } from './utils/locale';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import App from './App';

import msgsNb from './language/nb';
import msgsEn from './language/en';
import msgsNn from './language/nn';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

const messages = {
    nb: msgsNb,
    en: msgsEn,
    nn: msgsNn,
};

const init = async () => {
    if (process.env.NODE_ENV === 'development') {
        await import('./clients/apiMock').then(({ setUpMock }) => setUpMock());
        injectDecoratorClientSide({
            env: 'localhost',
            port: 8100,
        });
    }

    const container = document.getElementById('app') as HTMLElement;
    if (!container) {
        return;
    }
    createRoot(container).render(
        <StoreProvider initialState={initialState} reducer={reducer}>
            <RenderApp />
        </StoreProvider>
    );
    serviceWorker.unregister();
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

init();
