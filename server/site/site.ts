import { Hono, type Context } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { fileURLToPath } from 'node:url';
import { createProdRender, devRender } from './ssr/htmlRenderer.ts';
import { createCspMiddleware } from '#server/utils/cspMiddleware.ts';
import { env, isLocal } from '#server/utils/environment.ts';
import type { AppEnv } from '#server/types.ts';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN } = env;

// Helper function to extract locale from the URL
const extractLocale = (url: string) => {
	const localeMatch = url.match(new RegExp(`^${VITE_APP_BASEPATH}/(nb|nn|en|se)/`));
	return localeMatch && localeMatch[1] == 'en' ? localeMatch[1] : '';
};

// Determine if the route matches the required pattern
const isPathToFrontPage = (url: string) =>
	new RegExp(`^${VITE_APP_BASEPATH}(?:/(nb|nn|en|se))?/tilbakemeldinger$`).test(url);

// The pages and their assets
export const createSite = async () => {
	const site = new Hono<AppEnv>();
	let render: (url: string, c: Context<AppEnv>) => Promise<string>;

	if (env.NODE_ENV === 'development') {
		console.log('Configuring site endpoints for development mode');

		// With the Vite dev server that serves the app (see vite.config.ts)
		render = (url, c) => devRender(c.env.vite, url);
	} else {
		render = await createProdRender();

		// GET /person/kontakt-oss/assets/index-abc.js -> dist/client/assets/index-abc.js
		const clientDir = fileURLToPath(import.meta.resolve('#dist/client'));
		// serveStatic looks files up by the full request path, base path included, even though this app is mounted under it
		const withoutBasePath = (path: string) => path.slice(VITE_APP_BASEPATH.length);

		console.log(`Configuring site endpoints for production mode - Serving assets from ${clientDir}`);

		site.get(
			'/assets/*',
			serveStatic({
				root: clientDir,
				rewriteRequestPath: withoutBasePath,
				// File names contain a content hash, so a file never changes
				onFound: (_, c) => {
					c.header('Cache-Control', 'public, max-age=31536000');
				},
			})
		);
	}

	site.use(await createCspMiddleware());

	site.get('*', async (c) => {
		// The URL as the client sent it, path and query
		const originalUrl = c.env.incoming.url ?? c.req.path;

		// Redirect to editorial front page (Enonic XP) if conditions are met
		if (isPathToFrontPage(originalUrl) && !isLocal() && VITE_EDITORIAL_FRONTPAGE_ORIGIN) {
			const localeEnding = extractLocale(originalUrl);
			const redirectUrl = `${VITE_EDITORIAL_FRONTPAGE_ORIGIN}/${localeEnding}`;
			return c.redirect(redirectUrl, 301);
		}

		return c.html(await render(originalUrl, c));
	});

	return site;
};
