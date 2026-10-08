import express from 'express';
import compression from 'compression';
import { setupSiteRoutes } from './site/setupSiteRoutes.ts';
import { setupApiRoutes } from './api/setupApiRoutes.ts';
import { setupErrorHandlers } from './utils/errorHandlers.ts';
import { env, isLocal } from './utils/environment.ts';
import { metricsHandler } from './utils/metrics.ts';

export const createApp = async () => {
	const app = express();

	// Requests come in through the ingress (HAProxy), which appends the client address to
	// X-Forwarded-For, and then the ID-porten sidecar (Wonderwall), which passes the header on
	// unchanged and connects over loopback. Trusting only internal addresses makes req.ip the
	// right-most X-Forwarded-For entry that isn't ours, so entries a client adds on the left are
	// ignored. 100.64.0.0/10 covers clusters that put pods in the shared address space.
	// Without this, req.ip is the sidecar and every user shares one rate limit.
	app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal', '100.64.0.0/10']);
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
