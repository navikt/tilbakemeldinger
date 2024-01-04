import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoot } from './index';
import { HelmetProvider } from 'react-helmet-async';

export const render = (url: string) => {
    console.log('Rendering url:', url, import.meta.env.VITE_APP_BASEPATH);

    const helmetContext = {};

    return renderToString(
        <HelmetProvider context={helmetContext}>
            <StaticRouter
                basename={import.meta.env.VITE_APP_BASEPATH}
                location={url}
            >
                <AppRoot />
            </StaticRouter>
        </HelmetProvider>
    );
};
