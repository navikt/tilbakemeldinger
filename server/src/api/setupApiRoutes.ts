import { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler';
import { isAliveHandler } from './routes/isAlive/isAliveHandler';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler';
import { enheterHandler } from './routes/enheter/enheterHandler';
import { rateLimit } from 'express-rate-limit';
import { getAccessToken } from '../utils/auth/common';

export const setupApiRoutes = async (router: Router) => {
    const mottakHandler = [
        globalRateLimit,
        ipRateLimit,
        postToTilbakemeldingsmottakHandler,
    ];

    router.get('/internal/isAlive', isAliveHandler);
    router.get('/internal/isReady', isReadyHandler);
    router.get('/fodselsnr', fodselsNrHandler);
    router.post('/mottak/ros', ...mottakHandler);
    router.post('/mottak/serviceklage', ...mottakHandler);
    router.post('/mottak/feil-og-mangler', ...mottakHandler);
    router.get('/enheter', enheterHandler);
};

const globalRateLimit = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    max: 100,
    standardHeaders: true,
    keyGenerator: async (req) => {
        const accessToken = await getAccessToken(req);
        return accessToken || 'unauthenticated';
    },
    message: 'Rate limit',
});

const ipRateLimit = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 5,
    standardHeaders: true,
    keyGenerator: (req) => {
        return (
            req.ip ||
            req.get('x-real-ip') ||
            req.get('x-forwarded-for') ||
            'default'
        );
    },
    message: 'Rate limit IP',
});
