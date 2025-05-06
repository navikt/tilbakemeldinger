import { Request } from 'express';
import { getTokenxToken } from './tokenx';
import { getAzureadToken } from './azuread';

export const getAuthToken = (req: Request) =>
    req.headers.authorization?.split('Bearer ')[1];

export const getAccessToken = async (req: Request) => {
    const authToken = getAuthToken(req);

    if (req.params.path === 'serviceklage' && authToken) {
        try {
            return await getTokenxToken(
                authToken,
                `${process.env.ENV}-gcp:teamserviceklage:tilbakemeldingsmottak-api`
            );
        } catch (e) {
            console.log(
                'Failed to fetch tokenx token, fetching Azure AD token as fallback'
            );
        }
    }

    return await getAzureadToken(
        `api://${process.env.ENV}-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`
    );
};
