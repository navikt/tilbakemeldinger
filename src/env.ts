import type { ClientEnv } from '../env.schema.js';

/*
 * Client-side config.
 *
 * These values are validated at BUILD time by the gate in vite.config.ts — this
 * module is only the typed accessor, so zod never enters the browser bundle.
 *
 * Every field must be a direct `import.meta.env.X` read so Vite can inline it as
 * a literal at build time. Do not compute or default anything here.
 */
export const env: ClientEnv = {
    VITE_ENV: import.meta.env.VITE_ENV,
    VITE_APP_BASEPATH: import.meta.env.VITE_APP_BASEPATH,
    VITE_APP_ORIGIN: import.meta.env.VITE_APP_ORIGIN,
    VITE_TELEMETRY_URL: import.meta.env.VITE_TELEMETRY_URL,
};

/*
 * Plain booleans, unlike the server's `isLocalhost` type predicate: the client
 * config is a flat object (required-ness does not vary by environment), so there
 * is no union to narrow and nothing is lost by exporting the comparison.
 *
 * Read straight from import.meta.env rather than from `env` above: Rollup folds
 * a comparison against an inlined literal and drops the dead branches, but it
 * does not fold through an object property access — going via `env.VITE_ENV`
 * shipped the production URLs to the localhost bundle.
 */
export const isLocalhost = import.meta.env.VITE_ENV === 'localhost';
export const isDev = import.meta.env.VITE_ENV === 'dev';
