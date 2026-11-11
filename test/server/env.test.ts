import { describe, expect, test } from 'vitest';
import { API, startServer } from './server';
import { expectNoUnexpectedHosts } from './fixtures';

const UPSTREAM_ENV = {
	API_URL: undefined,
	AZURE_APP_TENANT_ID: undefined,
	AZURE_APP_CLIENT_ID: undefined,
	AZURE_APP_CLIENT_SECRET: undefined,
	TOKEN_X_WELL_KNOWN_URL: undefined,
	TOKEN_X_CLIENT_ID: undefined,
	TOKEN_X_PRIVATE_JWK: undefined,
};

describe('environment variables', () => {
	test.each(['API_URL', 'APP_ORIGIN', 'TELEMETRY_URL'])('a deployed server does not start without %s', async (name) => {
		await expect(startServer({ env: { [name]: undefined } })).rejects.toThrow(
			new RegExp(`Invalid environment variables[\\s\\S]*${name}`)
		);
	});

	// pnpm dev has no upstream variables, and no telemetry
	test('a local server starts without the upstream ones', async () => {
		const server = await startServer({ env: { ENV: 'localhost', TELEMETRY_URL: undefined, ...UPSTREAM_ENV } });

		expect((await server.fetch(`${API}/internal/isReady`)).status).toBe(200);
		expectNoUnexpectedHosts(server);
		await server.stop();
	});
});
