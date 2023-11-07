import { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler';
import { isAliveHandler } from './routes/isAlive/isAliveHandler';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler';
import {
    postToTilbakemeldingsmottakHandler,
} from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler';
import { enheterHandler } from './routes/enheter/enheterHandler';

export const setupApiRoutes = async (router: Router) => {
    router.get('/internal/isAlive', isAliveHandler);
    router.get('/internal/isReady', isReadyHandler);
    router.get('/fodselsnr', fodselsNrHandler);
    router.post('/mottak/:path(ros|serviceklage|feil-og-mangler)', postToTilbakemeldingsmottakHandler);
    // router.get('/enheter', enheterHandler)
};
