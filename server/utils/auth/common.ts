import { logger } from '@navikt/navno-logger';
import { getTokenxToken } from './tokenx.ts';
import { getAzureadToken } from './azuread.ts';
import { env } from '#server/env.ts';

export const getAuthToken = (authHeader: string | undefined) => authHeader?.split('Bearer ')[1];

type AccessTokenRequest = {
	// The incoming Authorization header
	authHeader: string | undefined;
	// The kind of feedback, from /mottak/:path
	path: string;
};

export const getAccessToken = async ({ authHeader, path }: AccessTokenRequest): Promise<string | undefined> => {
	if (env.ENV === 'localhost') {
		return env.MOCK_ACCESS_TOKEN;
	}
	const authToken = getAuthToken(authHeader);

	if (path === 'serviceklage' && authToken) {
		try {
			return await getTokenxToken(authToken, env.API_TOKENX_AUDIENCE);
		} catch {
			logger.warn('TokenX token exchange failed, using an Azure AD token instead');
		}
	}

	return await getAzureadToken(env.API_AZURE_SCOPE);
};
