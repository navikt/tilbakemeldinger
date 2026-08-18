import * as client from 'openid-client';
import { importJWK } from 'jose';
import { env, isLocalhost } from '../env.js';

let _config: client.Configuration | undefined;

// TokenX is never used on localhost, so the config below is only reachable in a
// cluster. The env schema has already validated and JSON-parsed these values.
const tokenxEnv = () => {
    if (isLocalhost(env)) {
        throw new Error('TokenX er ikke tilgjengelig på localhost');
    }
    return env;
};

async function config() {
    if (_config === undefined) {
        const cluster = tokenxEnv();
        const _jwk = cluster.TOKEN_X_PRIVATE_JWK;
        const privateKey = await importJWK(_jwk, _jwk.alg ?? 'RS256');

        _config = await client.discovery(
            new URL(cluster.TOKEN_X_WELL_KNOWN_URL),
            cluster.TOKEN_X_CLIENT_ID,
            { token_endpoint_auth_method: 'private_key_jwt' },
            client.PrivateKeyJwt(
                { key: privateKey as CryptoKey, kid: _jwk.kid },
                {
                    [client.modifyAssertion]: (_header, payload) => {
                        payload.nbf = Math.floor(Date.now() / 1000);
                        payload.aud = _config?.serverMetadata().token_endpoint;
                    },
                }
            )
        );
    }
    return _config;
}

export async function getTokenxToken(subject_token: string, audience: string) {
    const _config = await config();

    try {
        const tokens = await client.genericGrantRequest(
            _config,
            'urn:ietf:params:oauth:grant-type:token-exchange',
            {
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience,
                subject_token,
            }
        );
        return tokens.access_token;
    } catch (err) {
        if (err instanceof client.ResponseBodyError) {
            console.error(
                `Noe gikk galt med token exchange mot TokenX.
      Feilmelding fra openid-client: (${err.error}).
      HTTP Status fra TokenX: (${err.status})
      Beskrivelse fra TokenX: (${err.error_description})`
            );
        }
        throw err;
    }
}
