import { createApp } from './app.ts';
import { env } from './utils/environment.ts';

const { APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV } = env;

console.log('env:', APP_PORT, VITE_APP_BASEPATH, ENV, NODE_ENV);

const app = await createApp().catch((e) => {
	console.error(`Error occured while initializing server! - ${e}`);
	throw e;
});

const server = app.listen(APP_PORT, () => {
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
