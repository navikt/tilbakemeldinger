/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import { visualizer } from 'rollup-plugin-visualizer';
import NavBrowserTargets from '@navikt/browserslist-config/vite';

export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
	process.env.NODE_ENV = process.env.NODE_ENV || 'production';
	process.env.VITE_ENV = process.env.ENV;

	return {
		plugins: [
			NavBrowserTargets(),
			preact(),
			...(process.env.ANALYZE ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []),
		],
		build: {
			sourcemap: true,
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
			tsconfigPaths: true,
			alias: {
				src: '/src',
				assets: '/src/assets',
				clients: '/src/clients',
				components: '/src/components',
				pages: '/src/pages',
				providers: '/src/providers',
				types: '/src/types',
				utils: '/src/utils',
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
				include: ['src/**/*.{ts,tsx}', 'common/**/*.ts', 'server/src/**/*.ts'],
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
						include: ['{src,common,server/src}/**/*.test.{ts,tsx}'],
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
