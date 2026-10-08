import { getTokenxToken } from './tokenx.ts';
import { getAzureadToken } from './azuread.ts';
import { env } from '#server/utils/environment.ts';

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
			return await getTokenxToken(authToken, `${env.ENV}-gcp:teamserviceklage:tilbakemeldingsmottak-api`);
		} catch {
			console.log('Failed to fetch tokenx token, fetching Azure AD token as fallback');
		}
	}

	return await getAzureadToken(`api://${env.ENV}-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`);
};
