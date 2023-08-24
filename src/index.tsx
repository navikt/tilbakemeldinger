import './polyfills';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import { StoreProvider, useStore } from './providers/Provider';
import { initialState, reducer } from './providers/Store';
import { setLocaleFromUrl } from './utils/locale';
import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import App from './App';

import msgsNb from './language/nb';
import msgsEn from './language/en';
import msgsNn from './language/nn';

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
            localUrl: 'http://localhost:8100/dekoratoren',
            params: {
                simple: false,
                chatbot: false,
                logoutWarning: true,
            },
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
