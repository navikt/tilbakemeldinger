import { corgi, isHttpError } from '@itsy/corgi';
import Cache from 'node-cache';
import { env } from '#server/utils/environment.ts';

const cacheKey = 'authHeader';

const cache = new Cache({
	deleteOnExpire: true,
});

const azureAdTokenApi = `https://login.microsoftonline.com/${env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`;

type TokenResponse = {
	token_type: 'Bearer';
	expires_in: number;
	access_token: string;
};

const fetchAccessToken = async (scope: string): Promise<TokenResponse | null> => {
	console.log('Refreshing access token...');

	try {
		return await corgi.post<TokenResponse>(azureAdTokenApi, {
			headers: { accept: 'application/json' },
			// Sent form-encoded. The variables are only optional locally (environment.ts), where submissions use MOCK_ACCESS_TOKEN
			body: new URLSearchParams({
				grant_type: 'client_credentials',
				client_id: env.AZURE_APP_CLIENT_ID ?? '',
				client_secret: env.AZURE_APP_CLIENT_SECRET ?? '',
				scope,
			}),
		});
	} catch (error) {
		if (isHttpError(error)) {
			console.error('Bad response from token service', error.data);
			return null;
		}
		throw error;
	}
};

export const getAzureadToken = async (scope: string) => {
	if (cache.has(cacheKey)) {
		return cache.get<string>(cacheKey);
	}

	const accessToken = await fetchAccessToken(scope);
	if (!accessToken) {
		return undefined;
	}

	cache.set(cacheKey, accessToken.access_token, accessToken.expires_in - 60);

	return accessToken.access_token;
};
