import express, { Router } from 'express';
import path from 'path';
import { createServer } from 'vite';
import { HtmlRenderer, devRender, prodRender } from './ssr/htmlRenderer';
import { createCacheMiddleware } from '../utils/cacheMiddleware';
import { createCspMiddleware } from '../utils/cspMiddleware';

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
            base: process.env.VITE_APP_BASEPATH,
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
        const originalUrlSegment = req.originalUrl.split('/');
        if (
            originalUrlSegment[originalUrlSegment.length - 1] ===
            'tilbakemeldinger'
        ) {
            return res.redirect(301, 'http://www.nav.no');
        }
        const html = await render(req.originalUrl);
        return res.status(200).send(html);
    });
};
