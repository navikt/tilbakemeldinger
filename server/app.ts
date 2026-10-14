import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { api } from './api/api.ts';
import { createSite } from './site/site.ts';
import { setupErrorHandlers } from './utils/errorHandlers.ts';
import { env } from './utils/environment.ts';
import { metricsHandler } from './utils/metrics.ts';
import type { AppEnv } from './types.ts';

// strict: false matches routes with/without trailing slash
const app = new Hono<AppEnv>({ strict: false });
app.use(compress());

app.get('/internal/metrics', metricsHandler);

// Routes match in the order they're added
// The API is first so unknown API paths fall through to pages
const base = app.basePath(env.VITE_APP_BASEPATH);
base.route('/tilbakemeldinger/api', api);
base.route('/', await createSite());

await setupErrorHandlers(app);

// Served by prod-server.ts in production, and by Vite in dev
export default app;
