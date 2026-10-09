import type { MiddlewareHandler } from 'hono';
import Cache from 'node-cache';
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { decoratorEnvProps } from './decorator.ts';
import { type CSPDirectives, DATA, SELF } from 'csp-header';

/*
 * This middleware sets a CSP-header compatible with nav-dekoratoren
 * Refresh every 10 minutes to ensure we stay in sync with nav-dekoratoren
 * */

const myDirectives: Partial<CSPDirectives> = {
	'script-src': [SELF],
	'script-src-elem': [SELF],
	'style-src': [SELF],
	'style-src-elem': [SELF],
	'img-src': [SELF, DATA],
	'connect-src': [SELF],
};

const cache = new Cache({ deleteOnExpire: false, stdTTL: 600 });
const cacheKey = 'csp';

const buildAndCache = async () => {
	console.log('Building CSP header');

	const csp = await buildCspHeader(myDirectives, decoratorEnvProps);
	cache.set(cacheKey, csp);
};

cache.on('expired', buildAndCache);

export const createCspMiddleware = async (): Promise<MiddlewareHandler> => {
	await buildAndCache();

	return async (c, next) => {
		const csp = cache.get<string>(cacheKey);
		if (!csp) {
			console.error('CSP header value not available!');
			return next();
		}

		c.header('Content-Security-Policy', csp);
		await next();
	};
};
