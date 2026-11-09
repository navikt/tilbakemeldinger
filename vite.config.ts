/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import devServer, { defaultOptions } from '@hono/vite-dev-server';
import { visualizer } from 'rollup-plugin-visualizer';
import NavBrowserTargets from '@navikt/browserslist-config/vite';

export default defineConfig(({ mode, isSsrBuild }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
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
			...(process.env.ANALYZE ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []),
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
			setupFiles: ['./test/setup.ts'],
			// Pinned so a local .env (e.g. ENV=localhost, which enables fetch-mock)
			// can't change behavior or API URLs under test
			env: {
				VITE_APP_BASEPATH: '/person/kontakt-oss',
				VITE_APP_ORIGIN: 'http://localhost:9001',
				VITE_ENV: 'dev',
				VITE_TELEMETRY_URL: 'http://localhost:9001/collect',
			},
			coverage: {
				include: ['client/**/*.{ts,tsx}', 'shared/**/*.ts', 'server/**/*.ts'],
			},
			projects: [
				{
					extends: true,
					test: {
						name: 'unit',
						include: ['{client,shared,server}/**/*.test.{ts,tsx}'],
					},
				},
				{
					extends: true,
					test: {
						// Black-box tests against the built server. `pnpm run test:http`
						// first rebuilds the app with a pinned env (`pretest:http`), so it
						// must never be part of `pnpm test`: CI deploys run `test` between
						// the real build and the CDN upload/Docker build. To rerun against
						// the existing build: `pnpm exec vitest run --project http`
						name: 'http',
						include: ['test/http/**/*.test.ts'],
						hookTimeout: 30_000,
						testTimeout: 30_000,
					},
				},
			],
		},
	};
});
