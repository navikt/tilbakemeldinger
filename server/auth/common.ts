import { getTokenxToken } from './tokenx.js';
import { getAzureadToken } from './azuread.js';
import { env, isLocalhost } from '../env.js';

export const getAuthToken = (authHeader: string | undefined) =>
    authHeader?.split('Bearer ')[1];

/**
 * `onBehalfOfUser` picks the token type: a TokenX exchange carrying the user's
 * identity, or a machine token. Only serviceklage is submitted on behalf of a
 * logged-in user — this used to be inferred here from the route parameter.
 */
export const getAccessToken = async ({
    authHeader,
    onBehalfOfUser,
}: {
    authHeader: string | undefined;
    onBehalfOfUser: boolean;
}): Promise<string | undefined> => {
    if (isLocalhost(env)) {
        return env.MOCK_ACCESS_TOKEN;
    }

    const authToken = getAuthToken(authHeader);

    if (onBehalfOfUser && authToken) {
        try {
            return await getTokenxToken(
                authToken,
                `${env.ENV}-gcp:teamserviceklage:tilbakemeldingsmottak-api`
            );
        } catch {
            console.log(
                'Failed to fetch tokenx token, fetching Azure AD token as fallback'
            );
        }
    }

    return await getAzureadToken(
        `api://${env.ENV}-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`
    );
};
