import { defineConfig, loadEnv } from 'vite';
import preact from '@preact/preset-vite';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

// @ts-ignore
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
    process.env.NODE_ENV = process.env.NODE_ENV || 'production';

    return {
        plugins: [
            preact(),
            tsconfigPaths(),
            ...(process.env.ANALYZE
                ? [visualizer({ gzipSize: true, open: true, sourcemap: true })]
                : []),
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
                'react-router',
                'react-router-dom',
                'react-intl',
            ],
        },
        base: process.env.CDN_BASE || process.env.APP_BASEPATH,
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
