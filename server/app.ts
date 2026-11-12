import { Hono } from 'hono';
import { compress } from 'hono/compress';
import { HTTPException } from 'hono/http-exception';
import { routePath } from 'hono/route';
import { logger, traceRoute } from '@navikt/navno-logger';
import { api } from './api/api.ts';
import { createSite } from './site/site.ts';
import { env } from './env.ts';
import { metricsHandler } from './metrics.ts';
import type { AppEnv } from './types.ts';
import { BASE_PATH } from '#shared/paths.ts';

// strict: false matches routes with/without trailing slash
const app = new Hono<AppEnv>({ strict: false });

// Make OTel in Nais work
app.use(async (c, next) => {
	await next();
	traceRoute(routePath(c));
});
app.use(compress());

// Before the API, which has its own /fodselsnr
if (env.ENV === 'localhost') {
	const { devMocks } = await import('./dev/mocks.ts');
	app.route('/', devMocks);
}

app.get('/internal/metrics', metricsHandler);

// Routes match in the order they're added
// The API is first, since the pages' /tilbakemeldinger/* also matches /tilbakemeldinger/api/*
const base = app.basePath(BASE_PATH);
base.route('/tilbakemeldinger/api', api);
base.route('/', await createSite());

// Hono's own 404 Not Found answers the rest.
app.onError((err, c) => {
	if (err instanceof HTTPException) {
		const res = err.getResponse();
		return c.newResponse(res.body, res);
	}
	logger.error('Request failed', { method: c.req.method, path: c.req.path }, err);
	return c.text('Internal Server Error', 500);
});

// Served by prod-server.ts in production, and by Vite in dev
export default app;
