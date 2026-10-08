import type { HttpBindings } from '@hono/node-server';
import type { ViteDevServer } from 'vite';
import type { FailureReason } from './utils/metrics.ts';

// What every Hono app and handler in the server sees on its context
export type AppEnv = {
	// The Node request and response behind each request, and in development the Vite dev server
	// that serves the app (see vite.config.ts)
	Bindings: HttpBindings & { vite?: ViteDevServer };
	Variables: {
		// The parsed JSON request body (see jsonBody)
		body?: unknown;
		// Why a submission failed (see metrics)
		failureReason?: FailureReason;
	};
};
