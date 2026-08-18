import { env, isLocalhost } from '../env.js';

type TokenResponse = {
    token_type: 'Bearer';
    expires_in: number;
    access_token: string;
};

// Cached per scope. The previous implementation keyed every scope under a
// single constant, which would have silently returned the wrong token had a
// second scope ever been introduced.
const cache = new Map<string, { token: string; expiresAt: number }>();

const fetchAccessToken = async (
    scope: string
): Promise<TokenResponse | null> => {
    console.log('Refreshing access token...');

    // Built here rather than at module load: on localhost these are absent, and
    // interpolating undefined would silently bake a broken URL at import time.
    if (isLocalhost(env)) {
        throw new Error('Azure AD er ikke tilgjengelig på localhost');
    }

    const response = await fetch(
        `https://login.microsoftonline.com/${env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                accept: 'application/json',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: env.AZURE_APP_CLIENT_ID,
                client_secret: env.AZURE_APP_CLIENT_SECRET,
                scope,
            }),
        }
    );

    const responseJson = await response.json();

    if (!response.ok) {
        console.error('Bad response from token service', responseJson);
        return null;
    }

    return responseJson as TokenResponse;
};

export const getAzureadToken = async (scope: string) => {
    const cached = cache.get(scope);
    if (cached && cached.expiresAt > Date.now()) {
        return cached.token;
    }

    const accessToken = await fetchAccessToken(scope);
    if (!accessToken) {
        return undefined;
    }

    cache.set(scope, {
        token: accessToken.access_token,
        expiresAt: Date.now() + (accessToken.expires_in - 60) * 1000,
    });

    return accessToken.access_token;
};
