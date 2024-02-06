import { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler';
import { isAliveHandler } from './routes/isAlive/isAliveHandler';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler';
import { enheterHandler } from './routes/enheter/enheterHandler';
import { rateLimit } from 'express-rate-limit';

export const setupApiRoutes = async (router: Router) => {
    router.get('/internal/isAlive', isAliveHandler);
    router.get('/internal/isReady', isReadyHandler);
    router.get('/fodselsnr', fodselsNrHandler);
    router.post(
        '/mottak/:path(ros|serviceklage|feil-og-mangler)',
        rateLimit({
            windowMs: 60 * 1000, // 1 minutes
            max: 3,
            standardHeaders: true,
        }),
        postToTilbakemeldingsmottakHandler
    );
    router.get('/enheter', enheterHandler);
};
