// First, so that what the app logs while it loads goes through the logger too
import './utils/console.ts';
import { serve } from '@hono/node-server';
import { logger } from '@navikt/navno-logger';
import app from './app.ts';
import { env } from './env.ts';

const { APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV } = env;

logger.info('Starting server', { port: APP_PORT, basePath: VITE_APP_BASEPATH, env: ENV, nodeEnv: NODE_ENV });

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
