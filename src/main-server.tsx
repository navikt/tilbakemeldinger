import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoot } from './index';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';

type HelmetContext = {
    helmet?: HelmetServerState;
};

export const render = (url: string) => {
    const helmetContext: HelmetContext = {};

    const html = renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter
                basename={import.meta.env.VITE_APP_BASEPATH}
                location={url}
            >
                <AppRoot url={url} />
            </StaticRouter>
        </HelmetProvider>
    );

    const { helmet } = helmetContext;

    return { html, helmet };
};
