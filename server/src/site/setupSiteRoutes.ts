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

        const routeRegex = new RegExp(
            `^${VITE_APP_BASEPATH}(?:/(nb|nn|en|se))?/tilbakemeldinger$`
        );

        // If not running locally, redirect the front page to the editorial front page
        // at nav.no (Enoonic)
        if (
            routeRegex.test(originalUrl) &&
            !isLocal() &&
            VITE_EDITORIAL_FRONTPAGE_ORIGIN
        ) {
            res.redirect(301, VITE_EDITORIAL_FRONTPAGE_ORIGIN);
            return;
        }
        const html = await render(req.originalUrl);
        res.status(200).send(html);
    });
};
