import express from 'express';
import compression from 'compression';
import { setupSiteRoutes } from './site/setupSiteRoutes.js';
import { setupApiRoutes } from './api/setupApiRoutes';
import { setupErrorHandlers } from './utils/errorHandlers';
import { isLocal } from './utils/environment';

import 'dotenv/config';

const { APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV } = process.env;

console.log('env:', APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV);

const app = express();
app.use(compression());
app.use(express.json());

const siteRouter = express.Router();
const apiRouter = express.Router();

app.use(VITE_APP_BASEPATH, siteRouter);
siteRouter.use('/tilbakemeldinger/api', apiRouter);

// Redirect from root to basepath in local development environments
if (isLocal() && VITE_APP_BASEPATH && VITE_APP_BASEPATH !== '/') {
    app.get('/', (req, res) =>
        res.redirect(`${VITE_APP_BASEPATH}/tilbakemeldinger`)
    );
}

setupApiRoutes(apiRouter)
    .then(() => setupSiteRoutes(siteRouter))
    .then(() => setupErrorHandlers(app))
    .catch((e) => {
        console.error(`Error occured while initializing server! - ${e}`);
        throw e;
    })
    .then(() => {
        const server = app.listen(APP_PORT, () => {
            console.log(`Server starting on port ${APP_PORT}`);
        });

        const shutdown = () => {
            console.log('Server shutting down');

            server.close(() => {
                console.log('Shutdown complete!');
                process.exit(0);
            });
        };

        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    });
