import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoot } from './index';
import { HelmetProvider, HelmetServerState } from 'react-helmet-async';

type HelmetContext = {
    helmet?: HelmetServerState;
};

export const render = (url: string) => {
    const helmetContext: HelmetContext = {}; // Use your custom type here

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

    // After rendering, helmetContext will contain the Helmet state
    const { helmet } = helmetContext;

    return { html, helmet };
};
