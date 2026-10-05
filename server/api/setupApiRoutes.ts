import type { Router } from 'express';
import { isReadyHandler } from './routes/isReady/isReadyHandler.ts';
import { isAliveHandler } from './routes/isAlive/isAliveHandler.ts';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler.ts';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler.ts';
import { enheterHandler } from './routes/enheter/enheterHandler.ts';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { getAccessToken } from '#server/utils/auth/common.ts';

export const setupApiRoutes = async (router: Router) => {
	router.get('/internal/isAlive', isAliveHandler);
	router.get('/internal/isReady', isReadyHandler);
	router.get('/fodselsnr', fodselsNrHandler);
	router.post('/mottak/:path', globalRateLimit, ipRateLimit, postToTilbakemeldingsmottakHandler);
	router.get('/enheter', enheterHandler);
};

const globalRateLimit = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	max: 100,
	standardHeaders: true,
	keyGenerator: async (req): Promise<string> => {
		const accessToken = await getAccessToken(req);
		if (!accessToken) {
			return 'unauthenticated';
		}
		return accessToken;
	},
	message: 'Rate limit',
});

const ipRateLimit = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 5,
	standardHeaders: true,
	keyGenerator: (req) => {
		// Use ipKeyGenerator helper to properly handle IPv6 addresses
		const ip = req.ip || req.socket.remoteAddress || '';
		return ipKeyGenerator(ip);
	},
	message: 'Rate limit IP',
});
