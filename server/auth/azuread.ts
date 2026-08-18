const azureAdTokenApi = `https://login.microsoftonline.com/${process.env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`;

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

    const response = await fetch(azureAdTokenApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            accept: 'application/json',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AZURE_APP_CLIENT_ID,
            client_secret: process.env.AZURE_APP_CLIENT_SECRET,
            scope,
        }),
    });

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
