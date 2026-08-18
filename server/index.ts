import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { serve } from '@hono/node-server';
import { apiRoutes } from './routes/api.js';
import { createSiteRoutes } from './routes/site.js';
import { createNotFoundHandler } from './utils/errorHandlers.js';
import { isLocal } from './utils/environment.js';
import { warmPageStore, startPageStoreRefresh } from './ssr/pageStore.js';
import { paths } from '../common/paths.js';

const { APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV } = process.env;

console.log('env:', APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV);

export const createApp = async () => {
    const app = new Hono();

    // The initial HTML is ~55kB and compresses to ~16kB. Not in dev: Vite's
    // dev server does its own encoding and the two conflict.
    if (!import.meta.env.DEV) app.use(compress());

    if (isLocal() && VITE_APP_BASEPATH && VITE_APP_BASEPATH !== '/') {
        app.get('/', (c) =>
            c.redirect(`${VITE_APP_BASEPATH}${paths.tilbakemeldinger.forside}`)
        );
    }

    app.route(VITE_APP_BASEPATH, await createSiteRoutes(apiRoutes));

    const notFound = await createNotFoundHandler();
    app.notFound(notFound);
    app.onError((err, c) => {
        console.error(`Server error on ${c.req.path}: ${err.stack ?? err}`);
        return c.body(null, 500);
    });

    return app;
};

export const app = await createApp();

// Vite's dev server imports this module and serves app.fetch itself.
if (!import.meta.env.DEV) {
    const server = serve({ fetch: app.fetch, port: Number(APP_PORT) }, () =>
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

export default app;
