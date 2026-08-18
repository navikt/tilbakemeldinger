import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { serve } from '@hono/node-server';
import { apiRoutes } from './routes/api.js';
import { createSiteRoutes } from './routes/site.js';
import { createNotFoundHandler } from './utils/errorHandlers.js';
import { env, isLocalhost } from './env.js';
import { warmPageStore, startPageStoreRefresh } from './ssr/pageStore.js';
import { paths } from '../common/paths.js';

const { APP_PORT, VITE_APP_BASEPATH } = env;

// Named fields only — never log the env object, it holds credentials.
console.log(
    `Config OK: ENV=${env.ENV} APP_PORT=${APP_PORT} BASEPATH=${VITE_APP_BASEPATH}`
);

/**
 * Builds a fully configured app without binding a port, so a test can do:
 *
 *   const app = await createApp();
 *   const res = await app.request('/person/kontakt-oss/nb/...');
 */
export const createApp = async () => {
    const app = new Hono();

    // The initial HTML is ~55kB and compresses to ~16kB. Not in dev: Vite's dev
    // server does its own encoding and the two conflict.
    if (!import.meta.env.DEV) {
        app.use(compress());
    }

    if (isLocalhost(env) && VITE_APP_BASEPATH !== '/') {
        app.get('/', (c) =>
            c.redirect(`${VITE_APP_BASEPATH}${paths.tilbakemeldinger.forside}`)
        );
    }

    app.route(VITE_APP_BASEPATH, await createSiteRoutes(apiRoutes));

    app.notFound(await createNotFoundHandler());

    app.onError((err, c) => {
        console.error(`Server error on ${c.req.path}: ${err.stack ?? err}`);
        return c.body(null, 500);
    });

    return app;
};

/**
 * The singleton the runtime entry points use — Vite's dev server imports it as
 * the default export, and the production branch below serves it. Deliberately
 * NOT named `app`: that name belongs to the local inside createApp.
 */
const instance = await createApp();

// In dev, Vite's dev server imports this module and serves the default export
// itself, so we must not bind a port.
if (!import.meta.env.DEV) {
    const server = serve({ fetch: instance.fetch, port: APP_PORT }, () =>
        console.log(`Server starting on port ${APP_PORT}`)
    );

    // Warm in the background: readiness must not wait on nav-dekoratoren.
    void warmPageStore();
    startPageStoreRefresh();

    const shutdown = () => {
        console.log('Server shutting down');
        server.close(() => {
            console.log('Shutdown complete!');
            process.exit(0);
        });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

export default instance;
