import { isIPv6 } from 'node:net';
import { isTrustedProxy } from '@navikt/client-ip';
import { clientIp } from '@navikt/client-ip/hono';
import type { Context } from 'hono';
import { createFactory } from 'hono/factory';
import { rateLimiter } from 'hono-rate-limiter';
import { Address6 } from 'ip-address';
import type { AppEnv } from '#server/types.ts';

// If we don't get an IP, or the IP is an 'oops' from our proxies, don't rate limit
const skip = (c: Context<AppEnv>) => !c.var.clientIp || isTrustedProxy(c.var.clientIp);

// Both limits are per client IP.
// IPv6 addresses are grouped by their /56 subnet, so one client can't rotate through its range
// State is in memory, so each pod counts on its own.
const clientKey = (c: Context<AppEnv>) => {
	const ip = c.var.clientIp ?? '';
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
	skip,
	message: 'Rate limit',
});

const burstRateLimit = rateLimiter<AppEnv>({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 5,
	keyGenerator: clientKey,
	skip,
	message: 'Rate limit IP',
});

export const rateLimit = createFactory<AppEnv>().createHandlers(clientIp(), sustainedRateLimit, burstRateLimit);
