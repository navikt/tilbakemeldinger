import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { URLs } from '../../../urls';

export const enheterHandler: RequestHandler = createProxyMiddleware({
    target: URLs.norg2Origin,
    pathRewrite: () => URLs.norg2Path,
    changeOrigin: true,
});
