import type { MiddlewareHandler } from 'hono';
import { LRUCache } from 'lru-cache';
import { logger } from '@navikt/navno-logger';
import { buildCspHeader, type DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { type CSPDirectives, DATA, SELF } from 'csp-header';
import { env } from './environment.ts';

// The decorator for this environment. Locally, production's
const decoratorEnvProps: DecoratorEnvProps =
	env.ENV === 'localhost' ? { env: 'localhost', localUrl: 'https://www.nav.no/dekoratoren' } : { env: env.ENV };

/*
 * This middleware sets a CSP-header compatible with nav-dekoratoren
 * */

const myDirectives: Partial<CSPDirectives> = {
	'script-src': [SELF],
	'script-src-elem': [SELF],
	'style-src': [SELF],
	'style-src-elem': [SELF],
	'img-src': [SELF, DATA],
	'connect-src': [SELF],
};

// buildCspHeader doesn't fail: when the decorator doesn't answer, it gives permissive fallback directives instead,
// which leave out ours
const isFromDecorator = (csp: string) => csp.includes('script-src');

// Refreshed every 10 minutes to stay in sync with the decorator, while requests get the current header. A refresh
// the decorator doesn't answer keeps the current header (the fallback, until the decorator first answers), and the
// decorator is asked again a minute later
const cache = new LRUCache<'csp', string>({
	max: 1,
	ttl: 10 * 60 * 1000,
	allowStale: true,
	allowStaleOnFetchRejection: true,
	// The clock is looked up on each call, so tests can fake it
	perf: { now: () => performance.now() },
	fetchMethod: async (_key, current, { options }) => {
		logger.info('Building CSP header');
		const csp = await buildCspHeader(myDirectives, decoratorEnvProps);
		if (isFromDecorator(csp)) {
			return csp;
		}
		options.ttl = 60 * 1000;
		return current ?? csp;
	},
});

export const createCspMiddleware = async (): Promise<MiddlewareHandler> => {
	// The first header, before the server takes traffic
	await cache.fetch('csp');

	return async (c, next) => {
		const csp = await cache.fetch('csp');
		if (csp) {
			c.header('Content-Security-Policy', csp);
		}
		await next();
	};
};
