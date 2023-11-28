import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoot } from './index';

export const render = (url: string, appContext: any) => {
    return renderToString(
        <StaticRouter basename={import.meta.env.VITE_APP_BASEPATH} location={url}>
            <AppRoot />
        </StaticRouter>
    );
};
