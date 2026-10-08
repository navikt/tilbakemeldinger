import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { api } from './api/api.ts';
import { createSite } from './site/site.ts';
import { setupErrorHandlers } from './utils/errorHandlers.ts';
import { env, isLocal } from './utils/environment.ts';
import { metricsHandler } from './utils/metrics.ts';
import type { AppEnv } from './types.ts';

const { VITE_APP_BASEPATH } = env;

// strict: false lets a route match with or without a trailing slash
const app = new Hono<AppEnv>({ strict: false });
app.use(compress());

// Scraped by NAIS straight from the pod (see .nais/config.yml). It's outside the
// base path, so the ingress never exposes it
app.get('/internal/metrics', metricsHandler);

// Redirect from root to basepath in local development environments
if (isLocal() && VITE_APP_BASEPATH !== '/') {
	app.get('/', (c) => c.redirect(`${VITE_APP_BASEPATH}/tilbakemeldinger`));
}

// Routes match in the order they're added
// The API is first so unknown API paths fall through to pages
app.route(`${VITE_APP_BASEPATH}/tilbakemeldinger/api`, api);
app.route(VITE_APP_BASEPATH, await createSite());

await setupErrorHandlers(app);

// Served by server.ts in production, and by the Vite dev server in development (see vite.config.ts)
export default app;
