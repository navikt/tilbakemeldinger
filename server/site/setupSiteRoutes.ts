import type { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import type { ViteDevServer } from 'vite';
import { fileURLToPath } from 'node:url';
import { type HtmlRenderer, createProdRender, devRender } from './ssr/htmlRenderer.ts';
import { createCspMiddleware } from '#server/utils/cspMiddleware.ts';
import { env, isLocal } from '#server/utils/environment.ts';
import type { AppEnv } from '#server/types.ts';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN } = env;

const assetsDir = fileURLToPath(import.meta.resolve('#dist/client/assets'));

// Helper function to extract locale from the URL
const extractLocale = (url: string) => {
	const localeMatch = url.match(new RegExp(`^${VITE_APP_BASEPATH}/(nb|nn|en|se)/`));
	return localeMatch && localeMatch[1] == 'en' ? localeMatch[1] : '';
};

// Determine if the route matches the required pattern
const isPathToFrontPage = (url: string) =>
	new RegExp(`^${VITE_APP_BASEPATH}(?:/(nb|nn|en|se))?/tilbakemeldinger$`).test(url);

export const setupSiteRoutes = async (router: Hono<AppEnv>, vite?: ViteDevServer) => {
	let render: HtmlRenderer;

	if (vite) {
		console.log('Configuring site endpoints for development mode');

		render = devRender(vite);
	} else {
		console.log(`Configuring site endpoints for production mode - Using assets dir ${assetsDir}`);

		render = await createProdRender();

		router.get(
			'/assets/*',
			serveStatic({
				root: assetsDir,
				rewriteRequestPath: (path) => path.slice(`${VITE_APP_BASEPATH}/assets`.length),
				onFound: (_, c) => {
					c.header('Cache-Control', 'public, max-age=31536000');
				},
			})
		);
	}

	router.use(await createCspMiddleware());

	router.get('*', async (c) => {
		// The URL as the client sent it, path and query
		const originalUrl = c.env.incoming.url ?? c.req.path;

		// Redirect to editorial front page (Enonic XP) if conditions are met
		if (isPathToFrontPage(originalUrl) && !isLocal() && VITE_EDITORIAL_FRONTPAGE_ORIGIN) {
			const localeEnding = extractLocale(originalUrl);
			const redirectUrl = `${VITE_EDITORIAL_FRONTPAGE_ORIGIN}/${localeEnding}`;
			return c.redirect(redirectUrl, 301);
		}

		return c.html(await render(originalUrl));
	});
};
