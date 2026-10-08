import express from 'express';
import compression from 'compression';
import { setupSiteRoutes } from './site/setupSiteRoutes.ts';
import { setupApiRoutes } from './api/setupApiRoutes.ts';
import { setupErrorHandlers } from './utils/errorHandlers.ts';
import { env, isLocal } from './utils/environment.ts';
import { metricsHandler } from './utils/metrics.ts';

export const createApp = async () => {
	const app = express();
	app.use(compression());
	app.use(express.json());

	// Scraped by NAIS straight from the pod (see .nais/config.yml). It's outside the
	// base path, so the ingress never exposes it
	app.get('/internal/metrics', metricsHandler);

	const siteRouter = express.Router();
	const apiRouter = express.Router();

	app.use(env.VITE_APP_BASEPATH, siteRouter);
	siteRouter.use('/tilbakemeldinger/api', apiRouter);

	// Redirect from root to basepath in local development environments
	if (isLocal() && env.VITE_APP_BASEPATH !== '/') {
		app.get('/', (req, res) => res.redirect(`${env.VITE_APP_BASEPATH}/tilbakemeldinger`));
	}

	await setupApiRoutes(apiRouter);
	await setupSiteRoutes(siteRouter);
	await setupErrorHandlers(app);

	return app;
};
