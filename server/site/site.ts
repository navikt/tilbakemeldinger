import { Hono, type Context, type Handler } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { fileURLToPath } from 'node:url';
import { joinURL, parseURL, withoutBase } from 'ufo';
import { localFrontPage } from './localFrontPage.ts';
import { createProdRender, devRender } from './ssr/htmlRenderer.ts';
import { createCspMiddleware } from '#server/utils/cspMiddleware.ts';
import { env, isLocal } from '#server/utils/environment.ts';
import { defaultLocale } from '#shared/locale.ts';
import type { AppEnv } from '#server/types.ts';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN: FRONTPAGE_URL } = env;

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
		const withoutBasePath = (path: string) => withoutBase(path, VITE_APP_BASEPATH);

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

	// Redirect to editorial frontpage when deployed
	if (FRONTPAGE_URL && !isLocal()) {
		const toFrontPage: Handler<AppEnv> = (c) =>
			c.redirect(c.req.param('locale') === 'en' ? joinURL(FRONTPAGE_URL, 'en') : FRONTPAGE_URL, 301);
		site.get('/tilbakemeldinger', toFrontPage);
		site.get('/:locale{nb|nn|en}/tilbakemeldinger', toFrontPage);
	} else {
		site.get('/:locale{nb|nn|en}/tilbakemeldinger', localFrontPage);
	}

	// No locale in the URL -> use defaults, while keeping the query
	site.get('/tilbakemeldinger/*', (c) => {
		const { pathname, search } = parseURL(c.req.url);
		return c.redirect(
			joinURL(VITE_APP_BASEPATH, defaultLocale, withoutBase(pathname, VITE_APP_BASEPATH)) + search,
			302
		);
	});

	// The app picks the page from the URL (client/App.tsx)
	site.get('/:locale{nb|nn|en}/tilbakemeldinger/*', async (c) => {
		// The URL as the client sent it, path and query
		const originalUrl = c.env.incoming.url ?? c.req.path;

		return c.html(await render(originalUrl, c));
	});

	return site;
};
