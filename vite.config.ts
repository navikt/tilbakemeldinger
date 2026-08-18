import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';
    process.env.VITE_ENV = process.env.ENV;

    return {
        plugins: [
            react(),
            tsconfigPaths(),
            ...(process.env.ANALYZE
                ? [visualizer({ gzipSize: true, open: true, sourcemap: true })]
                : []),
        ],
        build: {
            sourcemap: true,
        },
        ssr: {
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
    };
});
