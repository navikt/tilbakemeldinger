import { corgi, isHttpError } from '@itsy/corgi';
import { withTimeout } from '@itsy/corgi/timeout';
import { LRUCache } from 'lru-cache';
import { logger } from '@navikt/navno-logger';
import { env } from '#server/utils/environment.ts';

const azureAdTokenApi = `https://login.microsoftonline.com/${env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`;

const azureAd = corgi.create({ plugins: [withTimeout(10_000)] });

type TokenResponse = {
	token_type: 'Bearer';
	expires_in: number;
	access_token: string;
};

// A token per scope, until a minute before it expires. Requests at the same time share one token request,
// and a request that fails isn't kept
const tokens = new LRUCache<string, string>({
	max: 10,
	fetchMethod: async (scope, _expired, { options }) => {
		logger.info('Refreshing Azure AD token');

		try {
			const token = await azureAd.post<TokenResponse>(azureAdTokenApi, {
				headers: { accept: 'application/json' },
				// Sent form-encoded. The variables are only optional locally (environment.ts), where submissions use MOCK_ACCESS_TOKEN
				body: new URLSearchParams({
					grant_type: 'client_credentials',
					client_id: env.AZURE_APP_CLIENT_ID ?? '',
					client_secret: env.AZURE_APP_CLIENT_SECRET ?? '',
					scope,
				}),
			});
			options.ttl = Math.max(token.expires_in - 60, 1) * 1000;
			return token.access_token;
		} catch (error) {
			// Azure AD's error answer has the OAuth error and its description, nothing about the user
			logger.error(
				'Failed to get a token from Azure AD',
				isHttpError(error) ? { status: error.status, response: error.data } : error
			);
			return undefined;
		}
	},
});

export const getAzureadToken = (scope: string) => tokens.fetch(scope);
