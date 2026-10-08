import { createServer } from 'node:http';
import { getRequestListener } from '@hono/node-server';
import { createApp } from './app.ts';
import { env } from './utils/environment.ts';

const { APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV } = env;

console.log('env:', APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV);

const createViteServer = async () => {
	const { createServer } = await import('vite');
	return createServer({
		server: { middlewareMode: true },
		appType: 'custom',
		// Load vite.config.ts in Vite's own module runner. The default writes a
		// temporary .mjs, which `node --watch` sees disappear and restarts on
		configLoader: 'runner',
		base: VITE_APP_BASEPATH,
	});
};

// In development, Vite serves the client code and HMR, and the app renders pages with it
const vite = NODE_ENV === 'development' ? await createViteServer() : undefined;

const app = await createApp(vite).catch((e) => {
	console.error(`Error occured while initializing server! - ${e}`);
	throw e;
});

const listener = getRequestListener(app.fetch);

const server = createServer(
	vite
		? (req, res) => {
				// Vite strips the base path from req.url before passing a request on
				const { url } = req;
				vite.middlewares(req, res, () => {
					req.url = url;
					listener(req, res);
				});
			}
		: listener
);

server.listen(APP_PORT, () => {
	console.log(`Server starting on port ${APP_PORT}`);
});

const shutdown = () => {
	console.log('Server shutting down');

	server.close(() => {
		console.log('Shutdown complete!');
		process.exit(0);
	});
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
