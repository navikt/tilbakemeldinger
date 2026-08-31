import { defineConfig, loadEnv } from 'vite';
import * as z from 'zod';
import { buildEnvSchema } from './env.schema.js';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import devServer from '@hono/vite-dev-server';

export default defineConfig(({ mode, command, isSsrBuild }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
    // The only definition of VITE_ENV — must precede validation below.
    process.env.VITE_ENV = process.env.ENV;

    // Vitest loads this config for its `test` block, but never serves or builds,
    // and `.env` is gitignored so a fresh clone has nothing to validate. Return a
    // config with only what running tests needs — sharing the build shape would
    // mean an unvalidated `base`, which stringifies into the dev-server excludes
    // below as the literal "undefined".
    if (process.env.VITEST) {
        return {
            // JSX still needs transforming: server tests reach src/main-server.tsx.
            plugins: [react()],
            resolve: { tsconfigPaths: true },
            test: {
                environment: 'node',
                include: [
                    '{src,common,server}/**/*.test.{ts,tsx}',
                    '*.test.ts',
                ],
                // server/env.ts validates at import time, so a test touching server
                // code needs a valid config. Declaring it here keeps `pnpm test`
                // working on a fresh clone, where `.env` does not exist yet.
                env: {
                    ENV: 'localhost',
                    APP_PORT: '9001',
                    VITE_APP_BASEPATH: '/person/kontakt-oss',
                    VITE_APP_ORIGIN: 'http://localhost:9001',
                    NORG2_ORIGIN: 'https://norg2.dev-fss-pub.nais.io',
                    MOCK_ACCESS_TOKEN: 'test-token',
                },
            },
        };
    }

    const env = parseBuildEnv();

    // Assets come from the CDN in deployed environments and from the app locally.
    const base = env.ENV === 'localhost' ? env.VITE_APP_BASEPATH : env.CDN_BASE;

    return {
        plugins: [
            react(),
            // Dev runs the Hono app inside Vite
            devServer({
                entry: './server/index.ts',
                // htmlRenderer runs every response through transformIndexHtml,
                // which already injects <script src="<base>/@vite/client"> into
                // the head. The plugin's own injection is unconditional and
                // lands after </html>, so it would only duplicate it.
                injectClientScript: false,
                // The app is served under a base path, so Vite's own dev
                // endpoints arrive prefixed (e.g. /person/kontakt-oss/@vite/
                // client). The plugin's default excludes only match unprefixed
                // paths, so without these the catch-all route answers Vite's
                // module requests with HTML and no client script ever loads.
                exclude: [
                    /^\/@.+$/,
                    new RegExp(`^${base}/@.+$`),
                    // Everything Vite serves out of the project tree.
                    new RegExp(`^${base}/(src|common|node_modules)/.*`),
                    /^\/node_modules\/.*/,
                    // Asset extensions, allowing Vite's ?import / ?t= queries.
                    /\.(css|scss|ts|tsx|js|jsx|json|map|svg|png|jpe?g|gif|webp|woff2?)(\?.*)?$/,
                    /^\/favicon\.ico$/,
                ],
            }),
            {
                // The SSR code needs transformIndexHtml in dev to rewrite asset
                // URLs for `base` and inject the HMR client. Hand it the server.
                name: 'expose-vite-dev-server',
                configureServer(server) {
                    (globalThis as Record<string, unknown>).__viteDevServer =
                        server;
                },
            },
            ...(env.ANALYZE
                ? [visualizer({ gzipSize: true, open: true, sourcemap: true })]
                : []),
        ],
        resolve: {
            // Aliases come from tsconfig paths
            tsconfigPaths: true,
        },
        build: {
            sourcemap: true,
            outDir: isSsrBuild ? 'dist/server' : 'dist/client',
            // The server bundle carries the SSR render and its dependencies, so
            // the runtime image needs almost no node_modules.
            ...(isSsrBuild && {
                rollupOptions: {
                    input: './server/index.ts',
                    output: { entryFileNames: 'index.js' },
                },
            }),
        },
        ssr: {
            // Bundle dependencies into the server build so the runtime image
            // needs no node_modules. In dev, keep Vite's default externalisation:
            // several deps (csp-header, the decorator's SSR entry) are CommonJS
            // and Vite's dev module runner cannot evaluate them, while node can.
            noExternal: command === 'build' ? true : undefined,
            resolve: { conditions: ['import', 'module', 'default'] },
        },
        server: {
            // Match APP_PORT so VITE_APP_ORIGIN (and therefore the decorator and
            // auth calls) resolve to the same origin in dev as in production.
            port: env.APP_PORT,
        },
        base,
        css: {
            // Scoped class names are opaque hashes, so let devtools name the
            // originating .module.scss and line for each rule instead. Applies
            // to dev only — builds follow build.sourcemap.
            devSourcemap: true,
        },
    };
});

/**
 * Fails the build rather than shipping a bundle with a bad or missing value
 * inlined into it. Prints the rule and the field name only, never the value.
 */
function parseBuildEnv() {
    const result = buildEnvSchema.safeParse(process.env);

    if (!result.success) {
        console.error('Invalid environment config — build stopped.');
        console.error(z.prettifyError(result.error));
        console.error('See env.schema.ts for variables are required per ENV.');
        process.exit(1);
    }

    return result.data;
}
