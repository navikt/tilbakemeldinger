/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import devServer, { defaultOptions } from '@hono/vite-dev-server';
import { visualizer } from 'rollup-plugin-visualizer';
import NavBrowserTargets from '@navikt/browserslist-config/vite';

// The same as BASE_PATH in shared/paths.ts. Not imported from there: this file is type-checked as a project
// of its own (tsconfig.node.json), which can't reach into the app's
const BASE_PATH = '/person/kontakt-oss';

export default defineConfig(({ command, mode, isSsrBuild }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	// The one thing a build bakes into the app: where its scripts and styles are served from. The workflows write
	// it to .env (their env-file). Everything else is read when the server runs (.nais/config.yml)
	if (command === 'build' && !process.env.CDN_BASE) {
		throw new Error(
			'Missing CDN_BASE. CI writes it to .env before building. To build locally with a test value, run `pnpm run build:local`'
		);
	}

	process.env.NODE_ENV = process.env.NODE_ENV || 'production';

	return {
		// No HTML entry: the server writes the pages (server/site/page.ts)
		appType: 'custom',
		// `pnpm dev`: the whole app on the app's own port
		server: {
			port: Number(process.env.APP_PORT) || undefined,
			strictPort: true,
			open: `${BASE_PATH}/tilbakemeldinger`,
		},
		plugins: [
			NavBrowserTargets(),
			react(),
			// In development, Vite serves the app: the server (server/app.ts) answers every
			// request except Vite's own endpoints and the client code it serves
			devServer({
				entry: './server/app.ts',
				exclude: [new RegExp(`^${BASE_PATH}/@`), /\.(scss|json)$/, ...defaultOptions.exclude],
				// The pages load Vite's client themselves (server/site/page.ts)
				injectClientScript: false,
			}),
			// The client bundle only (analyze-bundle)
			...(process.env.ANALYZE && !isSsrBuild ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []),
		],
		// The server build bundles every dependency, so the image needs no node_modules. The image scan can't see
		// bundled packages, so the SBOM comes from pnpm-lock.yaml instead (sbom-from-lockfile in the workflows)
		ssr: command === 'build' ? { noExternal: true } : undefined,
		// Otherwise React's development and production builds are both bundled, and picked between at runtime
		define: isSsrBuild ? { 'process.env.NODE_ENV': JSON.stringify('production') } : undefined,
		build: isSsrBuild
			? {
					outDir: 'dist/server',
					rolldownOptions: {
						// The server, and the app's renderer, which server/site/page.ts imports at startup. Their shared
						// dependencies go in shared chunks, so the server and the renderer use the same copies
						input: { main: 'server/main.ts', 'main-server': 'client/main-server.tsx' },
						// That import goes through package.json `imports`, to the renderer built next to the server
						external: [/^#dist\//],
					},
				}
			: {
					sourcemap: true,
					outDir: 'dist/client',
					// The manifest tells the server which files the page loads
					manifest: true,
					rolldownOptions: { input: 'client/main-client.tsx' },
				},
		base: process.env.CDN_BASE || BASE_PATH,
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
				// What the app is told about where it runs. test/setup.ts hands these to the app, and
				// test/server/server.ts starts the server with them
				APP_ORIGIN: 'http://localhost:9001',
				AUTH_URL: 'https://www.ekstern.dev.nav.no/person/nav-dekoratoren-api/auth',
				LOGIN_URL: 'https://login.ekstern.dev.nav.no/oauth2/login',
				TELEMETRY_URL: 'http://localhost:9001/collect',
			},
			// test/server: the server, in process (test/server/server.ts)
			include: ['{client,shared,server}/**/*.test.{ts,tsx}', 'test/server/**/*.test.ts'],
			coverage: {
				include: ['client/**/*.{ts,tsx}', 'shared/**/*.ts', 'server/**/*.ts'],
			},
		},
	};
});
