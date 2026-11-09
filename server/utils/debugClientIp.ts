// TEMP debug: remove after checking the proxy chain in front of the app.
// Only logs requests whose path contains "ip-log-test", so normal user traffic isn't logged.
import type { MiddlewareHandler } from 'hono';
import proxyaddr from 'proxy-addr';
import { clientKey } from '#server/api/rate-limit.ts';
import type { AppEnv } from '#server/types.ts';

const MARKER = 'ip-log-test';

// What req.ip would be under other trust settings, for comparison with what the rate limit uses
const trustOneHop = (_addr: string, i: number) => i < 1;
const trustWithGoogleLb = proxyaddr.compile([
	'loopback',
	'linklocal',
	'uniquelocal',
	'100.64.0.0/10',
	'35.191.0.0/16',
	'130.211.0.0/22',
	'2600:2d00:1:1::/64',
]);

export const debugClientIp: MiddlewareHandler<AppEnv> = async (c, next) => {
	if (c.req.path.includes(MARKER)) {
		const incoming = c.env.incoming;
		const header = (name: string) => c.req.header(name) ?? null;
		console.log(
			JSON.stringify({
				level: 'warn',
				message: `Debug client IP: ${c.req.method} ${c.req.path}`,
				debugClientIp: {
					path: c.req.path,
					xForwardedFor: header('x-forwarded-for'),
					socket: incoming.socket?.remoteAddress ?? null,
					xClientIp: header('x-client-ip'),
					xRealIp: header('x-real-ip'),
					forwarded: header('forwarded'),
					rateLimitKey: clientKey(c),
					trustOneHop: proxyaddr(incoming, trustOneHop),
					trustWithGoogleLb: proxyaddr(incoming, trustWithGoogleLb),
				},
			})
		);
	}
	await next();
};
