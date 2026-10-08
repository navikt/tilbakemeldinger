import type { Request, Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler.ts';
import { isAliveHandler } from './routes/isAlive/isAliveHandler.ts';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler.ts';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler.ts';
import { enheterHandler } from './routes/enheter/enheterHandler.ts';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { countSubmission } from '#server/utils/metrics.ts';

export const setupApiRoutes = async (router: Router) => {
	router.get('/internal/isAlive', isAliveHandler);
	router.get('/internal/isReady', isReadyHandler);
	router.get('/fodselsnr', fodselsNrHandler);
	router.post('/mottak/:path', countSubmission, sustainedRateLimit, burstRateLimit, postToTilbakemeldingsmottakHandler);
	router.get('/enheter', enheterHandler);
};

// Both limits are per client IP. req.ip is the real client because of 'trust proxy' in app.ts.
// ipKeyGenerator groups IPv6 addresses by subnet, so one client can't rotate through its range.
// State is in memory, so each pod counts on its own.
const clientKey = (req: Request) => ipKeyGenerator(req.ip || req.socket.remoteAddress || '');

// Every request counts, including the ones burstRateLimit rejects, so a client that keeps
// hammering past the burst limit gets locked out for the rest of the window
const sustainedRateLimit = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 100,
	standardHeaders: true,
	keyGenerator: clientKey,
	message: 'Rate limit',
});

const burstRateLimit = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 5,
	standardHeaders: true,
	keyGenerator: clientKey,
	message: 'Rate limit IP',
});
