// This is first so we get console.log patched as soon as possible
import './utils/console.ts';
import { serve } from '@hono/node-server';
import { logger } from '@navikt/navno-logger';
import app from './app.ts';
import { env } from './env.ts';
import { BASE_PATH } from '#shared/paths.ts';

const { APP_PORT, ENV, NODE_ENV } = env;

logger.info('Starting server', { port: APP_PORT, basePath: BASE_PATH, env: ENV, nodeEnv: NODE_ENV });

const server = serve({ fetch: app.fetch, port: APP_PORT }, () => {
	logger.info('Server listening', { port: APP_PORT });
});

const shutdown = () => {
	logger.info('Server shutting down');

	server.close(() => {
		logger.info('Shutdown complete');
		process.exit(0);
	});
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
