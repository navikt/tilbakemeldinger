import { isIPv6 } from 'node:net';
import type { Context, Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { rateLimiter } from 'hono-rate-limiter';
import { Address6 } from 'ip-address';
import proxyaddr from 'proxy-addr';
import { isReadyHandler } from './routes/isReady/isReadyHandler.ts';
import { isAliveHandler } from './routes/isAlive/isAliveHandler.ts';
import { fodselsNrHandler } from './routes/fodselsNr/fodselsNrHandler.ts';
import { postToTilbakemeldingsmottakHandler } from './routes/postToTilbakemeldingsmottak/postToTilbakemeldingsmottakHandler.ts';
import { enheterHandler } from './routes/enheter/enheterHandler.ts';
import { countSubmission } from '#server/utils/metrics.ts';
import { jsonBody } from '#server/utils/jsonBody.ts';
import type { AppEnv } from '#server/types.ts';

export const setupApiRoutes = async (router: Hono<AppEnv>) => {
	router.get('/internal/isAlive', isAliveHandler);
	router.get('/internal/isReady', isReadyHandler);
	router.get('/fodselsnr', fodselsNrHandler);
	router.post(
		'/mottak/:path',
		// The body is read before the rate limiters, so a request that's too large or isn't
		// valid JSON doesn't count against them
		bodyLimit({ maxSize: 100 * 1024 }),
		jsonBody,
		countSubmission,
		sustainedRateLimit,
		burstRateLimit,
		postToTilbakemeldingsmottakHandler
	);
	router.get('/enheter', enheterHandler);
};

// Requests come in through the ingress (HAProxy), which appends the client address to
// X-Forwarded-For, and then the ID-porten sidecar (Wonderwall), which passes the header on
// unchanged and connects over loopback. Trusting only internal addresses gives the right-most
// X-Forwarded-For entry that isn't ours, so entries a client adds on the left are ignored.
// 100.64.0.0/10 covers clusters that put pods in the shared address space.
// Without this, the address is the sidecar's and every user shares one rate limit.
const trustProxy = proxyaddr.compile(['loopback', 'linklocal', 'uniquelocal', '100.64.0.0/10']);

// Both limits are per client IP. IPv6 addresses are grouped by their /56 subnet, so one client
// can't rotate through its range, and IPv4-mapped ones count as IPv4.
// State is in memory, so each pod counts on its own.
const clientKey = (c: Context<AppEnv>) => {
	const ip = proxyaddr(c.env.incoming, trustProxy);
	if (!isIPv6(ip)) {
		return ip;
	}
	const address = new Address6(ip);
	return address.is4() ? address.to4().correctForm() : new Address6(`${ip}/56`).networkForm();
};

// Every request counts, including the ones burstRateLimit rejects, so a client that keeps
// hammering past the burst limit gets locked out for the rest of the window
const sustainedRateLimit = rateLimiter<AppEnv>({
	windowMs: 30 * 60 * 1000, // 30 minutes
	limit: 100,
	keyGenerator: clientKey,
	message: 'Rate limit',
});

const burstRateLimit = rateLimiter<AppEnv>({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5,
	keyGenerator: clientKey,
	message: 'Rate limit IP',
});
