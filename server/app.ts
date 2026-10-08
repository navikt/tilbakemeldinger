import { Hono } from 'hono';
import { compress } from 'hono/compress';
import type { ViteDevServer } from 'vite';
import { setupSiteRoutes } from './site/setupSiteRoutes.ts';
import { setupApiRoutes } from './api/setupApiRoutes.ts';
import { setupErrorHandlers } from './utils/errorHandlers.ts';
import { env, isLocal } from './utils/environment.ts';
import { metricsHandler } from './utils/metrics.ts';
import type { AppEnv } from './types.ts';

// In development, pass the Vite dev server that serves the client code
export const createApp = async (vite?: ViteDevServer) => {
	// strict: false lets a route match with or without a trailing slash
	const app = new Hono<AppEnv>({ strict: false });
	app.use(compress());

	// Scraped by NAIS straight from the pod (see .nais/config.yml). It's outside the
	// base path, so the ingress never exposes it
	app.get('/internal/metrics', metricsHandler);

	// Redirect from root to basepath in local development environments
	if (isLocal() && env.VITE_APP_BASEPATH !== '/') {
		app.get('/', (c) => c.redirect(`${env.VITE_APP_BASEPATH}/tilbakemeldinger`));
	}

	const siteRouter = new Hono<AppEnv>();
	const apiRouter = new Hono<AppEnv>();

	// Routes are matched in the order they're added, so API paths go first and
	// unknown ones fall through to the site routes
	await setupApiRoutes(apiRouter);
	siteRouter.route('/tilbakemeldinger/api', apiRouter);
	await setupSiteRoutes(siteRouter, vite);
	app.route(env.VITE_APP_BASEPATH, siteRouter);

	await setupErrorHandlers(app);

	return app;
};
