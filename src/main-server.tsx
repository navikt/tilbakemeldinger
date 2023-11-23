import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { AppRoot } from './index';

const { APP_BASEPATH } = import.meta.env;

export const render = (url: string, appContext: any) => {
    return renderToString(
        <StaticRouter basename={APP_BASEPATH} location={url}>
            <AppRoot />
        </StaticRouter>,
    );
};
