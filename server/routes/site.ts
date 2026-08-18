import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { createCspMiddleware } from '../middleware/csp.js';
import { getPage } from '../ssr/pageStore.js';
import { isLocal } from '../utils/environment.js';
import { paths } from '../../common/paths.js';
import { validLocales } from '../../common/locale.js';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN } = process.env;

const localeGroup = validLocales.join('|');

const isPathToFrontPage = (path: string) =>
    new RegExp(
        `^${VITE_APP_BASEPATH}(?:/(${localeGroup}))?${paths.tilbakemeldinger.forside}$`
    ).test(path);

// Only English gets its own editorial front page; the others use the default.
const editorialLocaleSuffix = (path: string) => {
    const match = path.match(
        new RegExp(`^${VITE_APP_BASEPATH}/(${localeGroup})/`)
    );
    return match?.[1] === 'en' ? 'en' : '';
};

// The API sub-app must be mounted before the catch-all below: Hono resolves
// routes in registration order, so a '/*' registered first would swallow it.
export const createSiteRoutes = async (apiRoutes: Hono) => {
    const site = new Hono();

    site.route('/tilbakemeldinger/api', apiRoutes);

    if (!import.meta.env.DEV) {
        // Assets normally come from the CDN; this is the fallback path.
        site.use(
            '/assets/*',
            serveStatic({
                root: './dist/client',
                rewriteRequestPath: (path) =>
                    path.replace(`${VITE_APP_BASEPATH}/`, '/'),
                onFound: (_path, c) =>
                    c.header(
                        'Cache-Control',
                        'public, max-age=31536000, immutable'
                    ),
            })
        );
    }

    site.use(await createCspMiddleware());

    site.get('/*', async (c) => {
        const path = c.req.path;

        if (
            isPathToFrontPage(path) &&
            !isLocal() &&
            VITE_EDITORIAL_FRONTPAGE_ORIGIN
        ) {
            return c.redirect(
                `${VITE_EDITORIAL_FRONTPAGE_ORIGIN}/${editorialLocaleSuffix(path)}`,
                301
            );
        }

        return c.html(await getPage(path));
    });

    return site;
};
