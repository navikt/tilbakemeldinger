import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const enheterHandler: RequestHandler = createProxyMiddleware(
    ['/enheter'],
    {
        // target: process.env.NORG2_URL || '/enheter',
        target: '/enheter',
        pathRewrite: {
            ['^/enheter']: '/norg2/api/v1/enhet?enhetStatusListe=AKTIV',
        },
        changeOrigin: true,
    }
);
