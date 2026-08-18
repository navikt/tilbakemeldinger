import * as z from 'zod';
import { serverEnvSchema, type ServerEnv } from '../env.schema.js';

/*
 * Validates the runtime environment once, at import time.
 *
 * This module imports only leaves (zod and the schema), which makes it a sink in
 * the import graph. ESM evaluates a module body only after every dependency has
 * finished, so this parse runs before ANY consumer's module body — including the
 * top-level reads in routes/site.ts, ssr/pageStore.ts and utils/urls.ts. That
 * holds for every entry point (the SSR build, the Vite dev server, a direct
 * import from a test) and cannot be broken by reordering imports.
 *
 * On failure the process exits, which also kills `pnpm dev`. That is deliberate:
 * a half-configured server is exactly the silent-breakage class we are removing.
 * Under `pnpm dev` the vite.config.ts gate normally reports the same problems
 * first, at config load.
 */

const result = serverEnvSchema.safeParse(process.env);

if (!result.success) {
    // safeParse + prettifyError, never parse/throw: prettifyError prints only the
    // rule and the field name, never the offending value.
    console.error('Ugyldig miljøkonfigurasjon — serveren starter ikke.');
    console.error(z.prettifyError(result.error));
    console.error(
        'Se env.schema.ts for hvilke variabler appen krever per ENV.'
    );
    process.exit(1);
}

export const env = Object.freeze(result.data);

type LocalhostEnv = Readonly<Extract<ServerEnv, { ENV: 'localhost' }>>;

/*
 * Type predicate, not a plain boolean: the config is a discriminated union, so
 * `isLocalhost(env)` narrows `env` to the localhost member inside the branch
 * (and to the cluster member outside it). A `boolean` helper would read the same
 * but silently lose that, forcing non-null assertions at every use site.
 * It has to take the argument explicitly. Narrowing in TypeScript is local: a
 * zero-argument `isLocalhost()` — or an exported `const isLocalhost = env.ENV
 * === 'localhost'` — returns a plain boolean that carries no link back to `env`,
 * and TS 4.4's aliased-discriminant narrowing does not cross a module boundary.
 * All three alternatives were tested and none narrows either branch (removing
 * Object.freeze does not help). Exporting a pre-narrowed `env.ENV === 'localhost'
 * ? env : null` narrows only the positive branch, while three of the call sites
 * need the cluster fields in the negative one.
 */
export const isLocalhost = (e: Readonly<ServerEnv>): e is LocalhostEnv =>
    e.ENV === 'localhost';
