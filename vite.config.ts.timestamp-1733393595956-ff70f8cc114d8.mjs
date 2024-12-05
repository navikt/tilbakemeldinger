// ../vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/terje/Dev/tilbakemeldinger/node_modules/vite/dist/node/index.js";
import preact from "file:///Users/terje/Dev/tilbakemeldinger/node_modules/@preact/preset-vite/dist/esm/index.mjs";
import { visualizer } from "file:///Users/terje/Dev/tilbakemeldinger/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import tsconfigPaths from "file:///Users/terje/Dev/tilbakemeldinger/node_modules/vite-tsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  process.env.NODE_ENV = process.env.NODE_ENV || "production";
  process.env.VITE_ENV = process.env.ENV;
  return {
    plugins: [
      preact(),
      tsconfigPaths(),
      ...process.env.ANALYZE ? [visualizer({ gzipSize: true, open: true, sourcemap: true })] : []
    ],
    build: {
      sourcemap: true
    },
    ssr: {
      // Dependencies containing React components must not be externalized
      // from the SSR bundle, in order to work with preact/compat. This
      // list must also include transitive dependencies.
      noExternal: [
        "@navikt/ds-react",
        "@navikt/aksel-icons",
        "@navikt/nav-dekoratoren-moduler",
        "@radix-ui/*",
        "react-router",
        "react-router-dom",
        "react-intl",
        "react-helmet-async",
        "react-hook-form"
      ]
    },
    base: process.env.CDN_BASE || process.env.VITE_APP_BASEPATH,
    css: {
      modules: {
        // Create stable (but verbose!) classnames in dev mode, in order
        // to support HMR
        ...process.env.NODE_ENV === "development" && {
          generateScopedName: "[path][name]__[local]"
        }
      }
    },
    resolve: {
      alias: {
        src: "/src",
        assets: "/src/assets",
        clients: "/src/clients",
        components: "/src/components",
        pages: "/src/pages",
        providers: "/src/providers",
        types: "/src/types",
        utils: "/src/utils"
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vdml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVyamUvRGV2L3RpbGJha2VtZWxkaW5nZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZXJqZS9EZXYvdGlsYmFrZW1lbGRpbmdlci92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVyamUvRGV2L3RpbGJha2VtZWxkaW5nZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwcmVhY3QgZnJvbSAnQHByZWFjdC9wcmVzZXQtdml0ZSc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuXG4vLyBAdHMtaWdub3JlXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gICAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKSB9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgfHwgJ3Byb2R1Y3Rpb24nO1xuICAgIHByb2Nlc3MuZW52LlZJVEVfRU5WID0gcHJvY2Vzcy5lbnYuRU5WO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgcHJlYWN0KCksXG4gICAgICAgICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICAgICAgICAuLi4ocHJvY2Vzcy5lbnYuQU5BTFlaRVxuICAgICAgICAgICAgICAgID8gW3Zpc3VhbGl6ZXIoeyBnemlwU2l6ZTogdHJ1ZSwgb3BlbjogdHJ1ZSwgc291cmNlbWFwOiB0cnVlIH0pXVxuICAgICAgICAgICAgICAgIDogW10pLFxuICAgICAgICBdLFxuICAgICAgICBidWlsZDoge1xuICAgICAgICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBzc3I6IHtcbiAgICAgICAgICAgIC8vIERlcGVuZGVuY2llcyBjb250YWluaW5nIFJlYWN0IGNvbXBvbmVudHMgbXVzdCBub3QgYmUgZXh0ZXJuYWxpemVkXG4gICAgICAgICAgICAvLyBmcm9tIHRoZSBTU1IgYnVuZGxlLCBpbiBvcmRlciB0byB3b3JrIHdpdGggcHJlYWN0L2NvbXBhdC4gVGhpc1xuICAgICAgICAgICAgLy8gbGlzdCBtdXN0IGFsc28gaW5jbHVkZSB0cmFuc2l0aXZlIGRlcGVuZGVuY2llcy5cbiAgICAgICAgICAgIG5vRXh0ZXJuYWw6IFtcbiAgICAgICAgICAgICAgICAnQG5hdmlrdC9kcy1yZWFjdCcsXG4gICAgICAgICAgICAgICAgJ0BuYXZpa3QvYWtzZWwtaWNvbnMnLFxuICAgICAgICAgICAgICAgICdAbmF2aWt0L25hdi1kZWtvcmF0b3Jlbi1tb2R1bGVyJyxcbiAgICAgICAgICAgICAgICAnQHJhZGl4LXVpLyonLFxuICAgICAgICAgICAgICAgICdyZWFjdC1yb3V0ZXInLFxuICAgICAgICAgICAgICAgICdyZWFjdC1yb3V0ZXItZG9tJyxcbiAgICAgICAgICAgICAgICAncmVhY3QtaW50bCcsXG4gICAgICAgICAgICAgICAgJ3JlYWN0LWhlbG1ldC1hc3luYycsXG4gICAgICAgICAgICAgICAgJ3JlYWN0LWhvb2stZm9ybScsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBiYXNlOiBwcm9jZXNzLmVudi5DRE5fQkFTRSB8fCBwcm9jZXNzLmVudi5WSVRFX0FQUF9CQVNFUEFUSCxcbiAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICBtb2R1bGVzOiB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIHN0YWJsZSAoYnV0IHZlcmJvc2UhKSBjbGFzc25hbWVzIGluIGRldiBtb2RlLCBpbiBvcmRlclxuICAgICAgICAgICAgICAgIC8vIHRvIHN1cHBvcnQgSE1SXG4gICAgICAgICAgICAgICAgLi4uKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnICYmIHtcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVTY29wZWROYW1lOiAnW3BhdGhdW25hbWVdX19bbG9jYWxdJyxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAgICAgc3JjOiAnL3NyYycsXG4gICAgICAgICAgICAgICAgYXNzZXRzOiAnL3NyYy9hc3NldHMnLFxuICAgICAgICAgICAgICAgIGNsaWVudHM6ICcvc3JjL2NsaWVudHMnLFxuICAgICAgICAgICAgICAgIGNvbXBvbmVudHM6ICcvc3JjL2NvbXBvbmVudHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VzOiAnL3NyYy9wYWdlcycsXG4gICAgICAgICAgICAgICAgcHJvdmlkZXJzOiAnL3NyYy9wcm92aWRlcnMnLFxuICAgICAgICAgICAgICAgIHR5cGVzOiAnL3NyYy90eXBlcycsXG4gICAgICAgICAgICAgICAgdXRpbHM6ICcvc3JjL3V0aWxzJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLGNBQWMsZUFBZTtBQUMzVCxPQUFPLFlBQVk7QUFDbkIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxtQkFBbUI7QUFLMUIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDdEMsVUFBUSxNQUFNLEVBQUUsR0FBRyxRQUFRLEtBQUssR0FBRyxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRSxFQUFFO0FBQ3BFLFVBQVEsSUFBSSxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQy9DLFVBQVEsSUFBSSxXQUFXLFFBQVEsSUFBSTtBQUVuQyxTQUFPO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxjQUFjO0FBQUEsTUFDZCxHQUFJLFFBQVEsSUFBSSxVQUNWLENBQUMsV0FBVyxFQUFFLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxLQUFLLENBQUMsQ0FBQyxJQUM1RCxDQUFDO0FBQUEsSUFDWDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0gsV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlELFlBQVk7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBQ0EsTUFBTSxRQUFRLElBQUksWUFBWSxRQUFRLElBQUk7QUFBQSxJQUMxQyxLQUFLO0FBQUEsTUFDRCxTQUFTO0FBQUE7QUFBQTtBQUFBLFFBR0wsR0FBSSxRQUFRLElBQUksYUFBYSxpQkFBaUI7QUFBQSxVQUMxQyxvQkFBb0I7QUFBQSxRQUN4QjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDSCxLQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxZQUFZO0FBQUEsUUFDWixPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDWDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
