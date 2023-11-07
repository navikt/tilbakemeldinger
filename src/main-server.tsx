import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { DummyApp } from './DummyApp';

const { BASE_URL } = import.meta.env;

export const render = (url: string, appContext: any) => {
    console.log(url, BASE_URL);

    return renderToString(
        <StaticRouter basename={BASE_URL} location={url}>
            <DummyApp />
        </StaticRouter>,
    );
};
