import express, { Router } from 'express';
import path from 'path';
import { createServer } from 'vite';
import { HtmlRenderer, devRender, prodRender } from './ssr/htmlRenderer';
import { createCacheMiddleware } from '../utils/cacheMiddleware';
import { createCspMiddleware } from '../utils/cspMiddleware';
import { isLocal } from '../utils/environment';

const { VITE_APP_BASEPATH, VITE_EDITORIAL_FRONTPAGE_ORIGIN } = process.env;

const assetsDir = path.resolve(process.cwd(), 'dist', 'client', 'assets');

const isProd = process.env.NODE_ENV !== 'development';

// Helper function to extract locale from the URL
const extractLocale = (url: string) => {
    const localeMatch = url.match(
        new RegExp(`^${VITE_APP_BASEPATH}/(nb|nn|en|se)/`)
    );
    return localeMatch ? localeMatch[1] : '';
};

// Determine if the route matches the required pattern
const isPathToFrontPage = (url: string) =>
    new RegExp(
        `^${VITE_APP_BASEPATH}(?:/(nb|nn|en|se))?/tilbakemeldinger$`
    ).test(url);

// Get locale from the URL

export const setupSiteRoutes = async (router: Router) => {
    let render: HtmlRenderer;

    if (isProd) {
        console.log(
            `Configuring site endpoints for production mode - Using assets dir ${assetsDir}`
        );

        router.use(
            '/assets',
            express.static(assetsDir, {
                maxAge: '1y',
                index: 'false',
            })
        );

        render = prodRender;
    } else {
        console.log('Configuring site endpoints for development mode');

        const vite = await createServer({
            server: { middlewareMode: true },
            appType: 'custom',
            root: '../',
            base: VITE_APP_BASEPATH,
        });

        router.use(vite.middlewares);

        render = devRender(vite);
    }

    router.use(
        '*',
        createCacheMiddleware({ ttlSec: 600, maxSize: 100 }),
        await createCspMiddleware()
    );

    router.get('*', async (req, res) => {
        const { originalUrl } = req;

        // Redirect to editorial front page (Enonic XP) if conditions are met
        if (
            isPathToFrontPage(originalUrl) &&
            !isLocal() &&
            VITE_EDITORIAL_FRONTPAGE_ORIGIN
        ) {
            const localeEnding = extractLocale(originalUrl);
            const redirectUrl = `${VITE_EDITORIAL_FRONTPAGE_ORIGIN}/${localeEnding}`;
            res.redirect(301, redirectUrl);
            return;
        }

        const html = await render(req.originalUrl);
        res.status(200).send(html);
    });
};
