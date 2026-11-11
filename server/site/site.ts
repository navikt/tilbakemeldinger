import { Hono, type Handler } from 'hono';
import { joinURL, parseURL, withoutBase, withTrailingSlash } from 'ufo';
import { localFrontPage } from './localFrontPage.ts';
import { createPageHandler } from './page.ts';
import { createCspMiddleware } from '#server/utils/cspMiddleware.ts';
import { env } from '#server/env.ts';
import { defaultLocale } from '#shared/locale.ts';
import { BASE_PATH } from '#shared/paths.ts';
import type { AppEnv } from '#server/types.ts';

const { VITE_EDITORIAL_FRONTPAGE_ORIGIN: FRONTPAGE_URL } = env;

// The pages. Their scripts and styles are served from the CDN (CDN_BASE in vite.config.ts)
export const createSite = async () => {
	const site = new Hono<AppEnv>();

	site.use(await createCspMiddleware());

	// Redirect to the editorial front page, which the deploys set
	if (FRONTPAGE_URL) {
		const toFrontPage: Handler<AppEnv> = (c) =>
			c.redirect(c.req.param('locale') === 'en' ? joinURL(FRONTPAGE_URL, 'en') : withTrailingSlash(FRONTPAGE_URL), 301);
		site.get('/tilbakemeldinger', toFrontPage);
		site.get('/:locale{nb|nn|en}/tilbakemeldinger', toFrontPage);
	} else {
		site.get('/:locale{nb|nn|en}/tilbakemeldinger', localFrontPage);
	}

	// No locale in the URL -> use defaults, while keeping the query
	site.get('/tilbakemeldinger/*', (c) => {
		const { pathname, search } = parseURL(c.req.url);
		return c.redirect(joinURL(BASE_PATH, defaultLocale, withoutBase(pathname, BASE_PATH)) + search, 302);
	});

	// The app picks the page from the URL (client/App.tsx)
	site.get('/:locale{nb|nn|en}/tilbakemeldinger/*', await createPageHandler());

	return site;
};
