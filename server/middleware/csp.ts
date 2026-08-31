import { MiddlewareHandler } from 'hono';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { CSPDirectives, DATA, SELF } from 'csp-header';
import { decoratorEnvProps } from '../utils/decorator.js';
import { env } from '../env.js';

/*
 * Sets a CSP header compatible with nav-dekoratoren, rebuilt periodically so we
 * stay in sync with the decorator.
 */

// Vite serves the app and its HMR socket on the same origin in dev.
const HMR_HOST = `localhost:${env.APP_PORT}`;
const REFRESH_MS = 600_000;

const myDirectives: Partial<CSPDirectives> = {
    'script-src': [SELF],
    'script-src-elem': [SELF],
    'style-src': [SELF],
    'style-src-elem': [SELF],
    'img-src': [SELF, DATA],
    'connect-src': [
        SELF,
        ...(import.meta.env.DEV
            ? [`ws://${HMR_HOST}`, `http://${HMR_HOST}`]
            : []),
    ],
};

let csp: string | undefined;
let builtAt = 0;
let refreshing = false;

const build = async () => {
    console.log('Building CSP header');
    csp = await buildCspHeader(myDirectives, decoratorEnvProps);
    builtAt = Date.now();
};

const refreshIfStale = () => {
    if (refreshing || Date.now() - builtAt <= REFRESH_MS) return;
    refreshing = true;
    build()
        .catch((e) => console.error(`CSP refresh failed: ${e}`))
        .finally(() => {
            refreshing = false;
        });
};

export const createCspMiddleware = async (): Promise<MiddlewareHandler> => {
    await build();

    return async (c, next) => {
        // Serve the current value and revalidate behind the request.
        refreshIfStale();

        if (csp) {
            c.header('Content-Security-Policy', csp);
        } else {
            console.error('CSP header value not available!');
        }

        await next();
    };
};
