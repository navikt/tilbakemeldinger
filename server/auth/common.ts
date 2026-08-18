import { getTokenxToken } from './tokenx.js';
import { getAzureadToken } from './azuread.js';

export const getAuthToken = (authHeader: string | undefined) =>
    authHeader?.split('Bearer ')[1];

export const getAccessToken = async ({
    authHeader,
    path,
}: {
    authHeader: string | undefined;
    path: string;
}): Promise<string | undefined> => {
    if (process.env.ENV === 'localhost') {
        return process.env.MOCK_ACCESS_TOKEN;
    }

    const authToken = getAuthToken(authHeader);

    if (path === 'serviceklage' && authToken) {
        try {
            return await getTokenxToken(
                authToken,
                `${process.env.ENV}-gcp:teamserviceklage:tilbakemeldingsmottak-api`
            );
        } catch {
            console.log(
                'Failed to fetch tokenx token, fetching Azure AD token as fallback'
            );
        }
    }

    return await getAzureadToken(
        `api://${process.env.ENV}-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`
    );
};
