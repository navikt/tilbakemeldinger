import { RequestHandler } from 'express';
import Cache from 'node-cache';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';
import { decoratorEnvProps } from './decorator';
import { CSPDirectives, SELF } from 'csp-header';

/*
 * This middleware sets a CSP-header compatible with nav-dekoratoren
 * Refresh every 10 minutes to ensure we stay in sync with nav-dekoratoren
 * */

const HMR_HOST = 'localhost:24678';

const myDirectives: Partial<CSPDirectives> = {
    'script-src': [SELF],
    'script-src-elem': [SELF],
    'style-src': [SELF],
    'style-src-elem': [SELF],
    'img-src': [SELF],
    ...(process.env.NODE_ENV === 'development' && {
        'connect-src': [`ws://${HMR_HOST}`, `http://${HMR_HOST}`],
    }),
};

const cache = new Cache({ deleteOnExpire: false, stdTTL: 600 });
const cacheKey = 'csp';

const buildAndCache = async () => {
    const csp = await buildCspHeader(myDirectives, decoratorEnvProps);
    cache.set(cacheKey, csp);
};

cache.on('expired', buildAndCache);

export const createCspMiddleware = async (): Promise<RequestHandler> => {
    await buildAndCache();

    return (req, res, next) => {
        const csp = cache.get<string>(cacheKey);
        if (!csp) {
            console.error('CSP header value not available!');
            return next();
        }

        res.setHeader('Content-Security-Policy', csp);
        next();
    };
};
