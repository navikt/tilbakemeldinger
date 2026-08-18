import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import devServer from '@hono/vite-dev-server';

export default defineConfig(({ mode, command, isSsrBuild }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
    process.env.VITE_ENV = process.env.ENV;

    return {
        plugins: [
            react(),
            // Dev runs the Hono app inside Vite: one process, HMR included, and
            // the same module graph the production bundle is built from.
            devServer({ entry: './server/index.ts' }),
            ...(process.env.ANALYZE
                ? [visualizer({ gzipSize: true, open: true, sourcemap: true })]
                : []),
        ],
        resolve: {
            // Aliases come from tsconfig paths - declared once, not three times.
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
        test: {
            environment: 'node',
            include: ['{src,common,server}/**/*.test.{ts,tsx}'],
        },
        base: process.env.CDN_BASE || process.env.VITE_APP_BASEPATH,
        css: {
            modules: {
                ...(mode === 'development' && {
                    generateScopedName: '[path][name]__[local]',
                }),
            },
        },
    };
});
