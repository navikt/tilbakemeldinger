/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import devServer, { defaultOptions } from '@hono/vite-dev-server';
import { visualizer } from 'rollup-plugin-visualizer';
import NavBrowserTargets from '@navikt/browserslist-config/vite';

// What a build bakes into the app. The workflows write them to .env (their env-file), and build:local sets test values
const buildEnv = ['ENV', 'VITE_APP_BASEPATH', 'VITE_APP_ORIGIN', 'VITE_TELEMETRY_URL'];

export default defineConfig(({ command, mode, isSsrBuild }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	const missing = buildEnv.filter((name) => !process.env[name]);
	if (command === 'build' && missing.length > 0) {
		throw new Error(
			`Missing ${missing.join(', ')}. CI writes them to .env before building. To build locally with test values, run \`pnpm run build:local\``
		);
	}

	process.env.NODE_ENV = process.env.NODE_ENV || 'production';
	process.env.VITE_ENV = process.env.ENV;
	const basepath = process.env.VITE_APP_BASEPATH;

	return {
		// No HTML entry: the server writes the pages (server/site/page.ts)
		appType: 'custom',
		// `pnpm dev`: the whole app on the app's own port
		server: {
			port: Number(process.env.APP_PORT) || undefined,
			strictPort: true,
			open: `${basepath}/tilbakemeldinger`,
		},
		plugins: [
			NavBrowserTargets(),
			react(),
			// In development, Vite serves the app: the server (server/app.ts) answers every
			// request except Vite's own endpoints and the client code it serves
			devServer({
				entry: './server/app.ts',
				exclude: [new RegExp(`^${basepath}/@`), /\.(scss|json)$/, ...defaultOptions.exclude],
				// The pages load Vite's client themselves (server/site/page.ts)
				injectClientScript: false,
			}),
			// The client bundle only (analyze-bundle)
			...(process.env.ANALYZE && !isSsrBuild ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []),
		],
		build: {
			sourcemap: true,
			outDir: isSsrBuild ? 'dist/ssr' : 'dist/client',
			// The client build: the manifest tells the server which files the page loads
			...(!isSsrBuild && { manifest: true, rolldownOptions: { input: 'client/main-client.tsx' } }),
		},
		base: process.env.CDN_BASE || basepath,
		css: {
			modules: {
				// Create stable (but verbose!) classnames in dev mode, in order
				// to support HMR
				...(process.env.NODE_ENV === 'development' && {
					generateScopedName: '[path][name]__[local]',
				}),
			},
		},
		test: {
			environment: 'node',
			clearMocks: true,
			// Many tests hit error paths on purpose, which will log, this shows only logs for tests that fail
			silent: 'passed-only',
			setupFiles: ['./test/setup.ts'],
			// Pinned so a local .env (e.g. ENV=localhost, which points the app at localhost)
			// can't change behavior or API URLs under test
			env: {
				// The server's logger writes straight to stdout, past the `silent` above. To see its logs: LOG_LEVEL=info pnpm test
				LOG_LEVEL: process.env.LOG_LEVEL ?? 'silent',
				VITE_APP_BASEPATH: '/person/kontakt-oss',
				VITE_APP_ORIGIN: 'http://localhost:9001',
				VITE_ENV: 'dev',
				VITE_TELEMETRY_URL: 'http://localhost:9001/collect',
			},
			// test/server: the server, in process (test/server/server.ts)
			include: ['{client,shared,server}/**/*.test.{ts,tsx}', 'test/server/**/*.test.ts'],
			coverage: {
				include: ['client/**/*.{ts,tsx}', 'shared/**/*.ts', 'server/**/*.ts'],
			},
		},
	};
});
