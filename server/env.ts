import { z } from 'zod';

const common = {
	NODE_ENV: z.enum(['development', 'production']).default('production'),
	APP_PORT: z.coerce.number().int(),
	// The app gets this and TELEMETRY_URL from the server (server/site/page.ts)
	APP_ORIGIN: z.url(),
	VITE_APP_BASEPATH: z.string().startsWith('/'),
	VITE_EDITORIAL_FRONTPAGE_ORIGIN: z.url().optional(),
	NORG2_ORIGIN: z.url(),
};

// Submissions go to tilbakemeldingsmottak-api with a token from Azure AD or TokenX.
// NAIS injects the AZURE_* and TOKEN_X_* variables
const upstream = z.object({
	API_URL: z.url(),
	AZURE_APP_TENANT_ID: z.string(),
	AZURE_APP_CLIENT_ID: z.string(),
	AZURE_APP_CLIENT_SECRET: z.string(),
	TOKEN_X_WELL_KNOWN_URL: z.url(),
	TOKEN_X_CLIENT_ID: z.string(),
	TOKEN_X_PRIVATE_JWK: z.string(),
});

const schema = z.discriminatedUnion('ENV', [
	z.object({ ENV: z.enum(['prod', 'dev']), TELEMETRY_URL: z.url(), ...common, ...upstream.shape }),
	// Locally, submissions use MOCK_ACCESS_TOKEN, so the upstream variables are optional, and there's no telemetry
	z.object({
		ENV: z.literal('localhost'),
		TELEMETRY_URL: z.url().optional(),
		MOCK_ACCESS_TOKEN: z.string().optional(),
		...common,
		...upstream.partial().shape,
	}),
]);

const parsed = schema.safeParse(process.env);

// Checked at startup, so a misconfigured pod crashes before it takes traffic
if (!parsed.success) {
	throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = parsed.data;
