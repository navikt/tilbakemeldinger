import { describe, expect, test } from 'vitest';
import { startServer } from './harness';
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
	test('a deployed server does not start when one is missing', async () => {
		await expect(startServer({ env: { API_URL: undefined } })).rejects.toThrow(/exited during startup[\s\S]*API_URL/);
	});

	// pnpm dev and start-local have no upstream variables
	test('a local server starts without the upstream ones', async () => {
		const server = await startServer({ env: { ENV: 'localhost', ...UPSTREAM_ENV } });

		expectNoUnexpectedHosts(server);
		await server.stop();
	});
});
