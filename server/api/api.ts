import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { rateLimit } from './rate-limit.ts';
import { fodselsNrHandler } from './fodselsNrHandler.ts';
import { postToMottakUpstreamHandler } from './postToMottakUpstreamHandler.ts';
import { enheterHandler } from './enheterHandler.ts';
import { countSubmission } from '#server/utils/metrics.ts';
import type { AppEnv } from '#server/types.ts';

export const api = new Hono<AppEnv>();
api.get('/internal/isAlive', (c) => c.text('OK'));
api.get('/internal/isReady', (c) => c.text('OK'));
api.get('/fodselsnr', fodselsNrHandler);
api.get('/enheter', enheterHandler);
api.post(
	'/mottak/:path',
	// The size limit goes before the rate limiters
	// -> a request that's too large doesn't count against them
	bodyLimit({ maxSize: 100 * 1024 }),
	countSubmission,
	...rateLimit,
	...postToMottakUpstreamHandler
);
