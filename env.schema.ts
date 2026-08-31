import * as z from 'zod';

/*
 * THE definition of every environment variable this app accepts.
 *
 * This file has NO side effects: `vite.config.ts` imports it at build time (when
 * the nais-injected secrets do not exist yet) and it is unit-tested directly.
 *
 * Three rules, each learned from a reproduced failure — please keep them:
 *
 *  1. Never write a message that interpolates the VALUE. `z.prettifyError` prints
 *     messages verbatim, so an interpolated secret goes straight to the pod log.
 *     Messages name the rule, never the value.
 *
 *  2. Never `.transform(JSON.parse)` directly. It throws a SyntaxError *out of*
 *     safeParse carrying a prefix of the input — i.e. a private key leak. Always
 *     `.refine(parsesAsJson)` first; the transform then never runs on bad input.
 *
 *  3. No `.transform()`, `.default()` or `.coerce` on VITE_* fields. Vite inlines
 *     the RAW process.env string into the browser bundle, so a transformed value
 *     would exist only in the build process and this schema would be lying about
 *     what the browser actually sees.
 *
 * Read by bundled dependencies, deliberately NOT validated here — we do not own
 * these contracts, and @nais/apm already wraps them in its own safeEnv():
 *   NAIS_APP_NAME, NAIS_NAMESPACE, NAIS_CLUSTER_NAME, NAIS_APP_IMAGE, NAIS_TEAM,
 *   GITHUB_SHA  ->  @nais/apm and @navikt/nav-dekoratoren-moduler
 */

/** Never log the values of these. Used by the redaction check in server/env.ts. */
export const SECRET_KEYS = [
    'AZURE_APP_CLIENT_SECRET',
    'TOKEN_X_PRIVATE_JWK',
    'MOCK_ACCESS_TOKEN',
] as const;

// ---------------------------------------------------------------------------
// Field definitions, declared once and shared across all three schemas
// ---------------------------------------------------------------------------

/**
 * Interpolated UNESCAPED into `new RegExp(...)` in server/routes/site.ts and
 * vite.config.ts, so regex metacharacters here would silently corrupt routing.
 */
const basepath = z
    .string()
    .regex(
        /^\/[a-zA-Z0-9/_-]*$/,
        'must start with / and contain no regex metacharacters'
    );

/** Must match `port:` in .nais/config.yml and EXPOSE in the Dockerfile (9001). */
const port = z.coerce.number().int().min(1).max(65535);

const parsesAsJsonObject = (value: string) => {
    try {
        return typeof JSON.parse(value) === 'object';
    } catch {
        return false;
    }
};

/** Rule 2 above: the refine must precede the transform. */
const privateJwk = z
    .string()
    .refine(parsesAsJsonObject, 'must be a JSON object')
    .transform((value) => JSON.parse(value))
    .pipe(z.looseObject({ kid: z.string(), alg: z.string().optional() }));

const environment = z.enum(['prod', 'dev', 'localhost']);

// ---------------------------------------------------------------------------
// What the browser bundle reads (validation only — see rule 3)
// ---------------------------------------------------------------------------

export const clientEnvSchema = z.object({
    /** Derived from ENV in vite.config.ts; defined nowhere else. */
    VITE_ENV: environment,
    VITE_APP_BASEPATH: basepath,
    VITE_APP_ORIGIN: z.url(),
    /** Set in CI only; absent when running locally. */
    VITE_TELEMETRY_URL: z.url().optional(),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;

// ---------------------------------------------------------------------------
// What the Node server reads at runtime
// ---------------------------------------------------------------------------

const serverShared = {
    APP_PORT: port,
    /** Only used for a log line here; vitest sets it to "test". */
    NODE_ENV: z.string().optional(),
    VITE_APP_BASEPATH: basepath,
    /** The SSR head needs it for the canonical link (see common/metadata.ts). */
    VITE_APP_ORIGIN: z.url(),
    /** Truthiness-guarded in server/routes/site.ts — the redirect is optional. */
    VITE_EDITORIAL_FRONTPAGE_ORIGIN: z.url().optional(),
    NORG2_ORIGIN: z.url(),
};

const serverLocalhost = z.object({
    ...serverShared,
    ENV: z.literal('localhost'),
    MOCK_ACCESS_TOKEN: z.string().min(1),
    // API_URL is genuinely absent locally: the client mocks /api.
});

const serverCluster = z.object({
    ...serverShared,
    /** Interpolated into the TokenX audience and the Azure scope. */
    ENV: z.enum(['dev', 'prod']),
    API_URL: z.url(),
    // Injected by nais `tokenx.enabled`.
    TOKEN_X_WELL_KNOWN_URL: z.url(),
    TOKEN_X_CLIENT_ID: z.string().min(1),
    TOKEN_X_PRIVATE_JWK: privateJwk,
    // Injected by nais `azure.application.enabled`.
    AZURE_APP_TENANT_ID: z.string().min(1),
    AZURE_APP_CLIENT_ID: z.string().min(1),
    AZURE_APP_CLIENT_SECRET: z.string().min(1),
});

export const serverEnvSchema = z.discriminatedUnion('ENV', [
    serverLocalhost,
    serverCluster,
]);

export type ServerEnv = z.infer<typeof serverEnvSchema>;

// ---------------------------------------------------------------------------
// What vite.config.ts needs at build time
// ---------------------------------------------------------------------------

const buildShared = {
    ...clientEnvSchema.shape,
    APP_PORT: port,
    ANALYZE: z.stringbool().optional(),
};

const buildLocalhost = z.object({
    ...buildShared,
    ENV: z.literal('localhost'),
});

const buildCluster = z.object({
    ...buildShared,
    ENV: z.enum(['dev', 'prod']),
    /** Assets are served from the CDN in deployed environments. */
    CDN_BASE: z.url(),
    VITE_TELEMETRY_URL: z.url(),
});

export const buildEnvSchema = z.discriminatedUnion('ENV', [
    buildLocalhost,
    buildCluster,
]);

export type BuildEnv = z.infer<typeof buildEnvSchema>;
