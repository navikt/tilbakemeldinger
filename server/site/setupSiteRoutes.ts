import express, { type Router } from 'express';
import { fileURLToPath } from 'node:url';
import { type HtmlRenderer, createProdRender, devRender } from './ssr/htmlRenderer.ts';
import { createCacheMiddleware } from '#server/utils/cacheMiddleware.ts';
import { createCspMiddleware } from '#server/utils/cspMiddleware.ts';
import { isLocal } from '#server/utils/environment.ts';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN } = process.env;

const assetsDir = fileURLToPath(import.meta.resolve('#dist/client/assets'));

const isProd = process.env.NODE_ENV !== 'development';

// Helper function to extract locale from the URL
const extractLocale = (url: string) => {
	const localeMatch = url.match(new RegExp(`^${VITE_APP_BASEPATH}/(nb|nn|en|se)/`));
	return localeMatch && localeMatch[1] == 'en' ? localeMatch[1] : '';
};

// Determine if the route matches the required pattern
const isPathToFrontPage = (url: string) =>
	new RegExp(`^${VITE_APP_BASEPATH}(?:/(nb|nn|en|se))?/tilbakemeldinger$`).test(url);

// Get locale from the URL

export const setupSiteRoutes = async (router: Router) => {
	let render: HtmlRenderer;

	if (isProd) {
		console.log(`Configuring site endpoints for production mode - Using assets dir ${assetsDir}`);

		render = await createProdRender();

		router.use(
			'/assets',
			express.static(assetsDir, {
				maxAge: '1y',
				index: 'false',
			})
		);
	} else {
		console.log('Configuring site endpoints for development mode');

		const { createServer } = await import('vite');
		const vite = await createServer({
			server: { middlewareMode: true },
			appType: 'custom',
			// Load vite.config.ts in Vite's own module runner. The default writes a
			// temporary .mjs, which `node --watch` sees disappear and restarts on
			configLoader: 'runner',
			base: VITE_APP_BASEPATH,
		});

		router.use(vite.middlewares);

		render = devRender(vite);
	}

	router.use(await createCspMiddleware(), createCacheMiddleware({ ttlSec: 600, maxSize: 100 }));

	router.get('/{*splat}', async (req, res) => {
		const { originalUrl } = req;

		// Redirect to editorial front page (Enonic XP) if conditions are met
		if (isPathToFrontPage(originalUrl) && !isLocal() && VITE_EDITORIAL_FRONTPAGE_ORIGIN) {
			const localeEnding = extractLocale(originalUrl);
			const redirectUrl = `${VITE_EDITORIAL_FRONTPAGE_ORIGIN}/${localeEnding}`;
			res.redirect(301, redirectUrl);
			return;
		}

		const html = await render(req.originalUrl);
		res.status(200).send(html);
	});
};
