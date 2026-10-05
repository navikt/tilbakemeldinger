/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import { visualizer } from 'rollup-plugin-visualizer';
import NavBrowserTargets from '@navikt/browserslist-config/vite';

// Paths outside Vite's root (client/), from the repo root where this file lives
const fromRepoRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig(({ mode, isSsrBuild }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
	process.env.NODE_ENV = process.env.NODE_ENV || 'production';
	process.env.VITE_ENV = process.env.ENV;

	return {
		// index.html and the client entries live in client/
		root: 'client',
		// .env is written to the repo root (by CI, and by `pnpm dev`)
		envDir: fromRepoRoot('.'),
		plugins: [
			NavBrowserTargets(),
			preact(),
			...(process.env.ANALYZE ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []),
		],
		build: {
			sourcemap: true,
			outDir: fromRepoRoot(isSsrBuild ? 'dist/ssr' : 'dist/client'),
			// outDir is outside root, which Vite otherwise refuses to empty
			emptyOutDir: true,
		},
		ssr: {
			// Dependencies containing React components must not be externalized
			// from the SSR bundle, in order to work with preact/compat. This
			// list must also include transitive dependencies.
			noExternal: [
				'@navikt/ds-react',
				'@navikt/aksel-icons',
				'@navikt/nav-dekoratoren-moduler',
				'@radix-ui/*',
				'react-router',
				'react-router-dom',
				'react-intl',
				'react-helmet-async',
				'react-hook-form',
			],
			resolve: {
				conditions: ['import', 'module', 'default'],
			},
			// Dev only (no effect on builds): the dev SSR runner can't load UMD/CommonJS
			// from noExternal, so convert it up front. Without this, rendering throws
			// "getAnalyticsInstance is not a function".
			optimizeDeps: {
				include: ['@navikt/nav-dekoratoren-moduler'],
			},
		},
		base: process.env.CDN_BASE || process.env.VITE_APP_BASEPATH,
		css: {
			modules: {
				// Create stable (but verbose!) classnames in dev mode, in order
				// to support HMR
				...(process.env.NODE_ENV === 'development' && {
					generateScopedName: '[path][name]__[local]',
				}),
			},
		},
		resolve: {
			// The aliases in tsconfig.json (components/*, utils/* ...) are the only ones
			tsconfigPaths: true,
		},
		test: {
			// Tests live in client/, shared/, server/ and test/, not only under Vite's root
			root: fromRepoRoot('.'),
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
					// Resolve packages like Node does. Otherwise Vite picks the CJS build of
					// react-router while react-router-dom loads the ESM one, and the app ends
					// up with two router contexts
					resolve: { conditions: ['module-sync'] },
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
