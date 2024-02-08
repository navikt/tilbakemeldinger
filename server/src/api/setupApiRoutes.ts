import { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler';
import { isAliveHandler } from './routes/isAlive/isAliveHandler';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler';
import { enheterHandler } from './routes/enheter/enheterHandler';
import { rateLimit } from 'express-rate-limit';
import { getAccessToken } from '../utils/auth/common';

export const setupApiRoutes = async (router: Router) => {
    router.get('/internal/isAlive', isAliveHandler);
    router.get('/internal/isReady', isReadyHandler);
    router.get('/fodselsnr', fodselsNrHandler);
    router.post(
        '/mottak/:path(ros|serviceklage|feil-og-mangler)',
        ipRateLimit,
        globalRateLimit,
        postToTilbakemeldingsmottakHandler
    );
    router.get('/enheter', enheterHandler);
};

const ipRateLimit = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    //max: 5,
    max: 7,
    standardHeaders: true,
    message: 'Rate limit IP',
});

const globalRateLimit = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    //max: 100,
    max: 3,
    standardHeaders: true,
    keyGenerator: async (req) => {
        const accessToken = await getAccessToken(req);
        return accessToken || 'unauthenticated';
    },
    message: 'Rate limit',
});
