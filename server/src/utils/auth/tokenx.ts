import * as client from 'openid-client';
import { importJWK } from 'jose';

let _config: client.Configuration | undefined;

function jwk() {
    if (!process.env.TOKEN_X_PRIVATE_JWK)
        throw new TypeError(
            'Miljøvariabelen "TOKEN_X_PRIVATE_JWK må være satt'
        );
    return JSON.parse(process.env.TOKEN_X_PRIVATE_JWK);
}

async function config() {
    if (typeof _config === 'undefined') {
        if (!process.env.TOKEN_X_WELL_KNOWN_URL)
            throw new TypeError(
                'Miljøvariabelen "TOKEN_X_WELL_KNOWN_URL må være satt'
            );
        if (!process.env.TOKEN_X_CLIENT_ID)
            throw new TypeError(
                'Miljøvariabelen "TOKEN_X_CLIENT_ID må være satt'
            );

        const _jwk = jwk();
        const privateKey = await importJWK(_jwk, _jwk.alg ?? 'RS256');

        _config = await client.discovery(
            new URL(process.env.TOKEN_X_WELL_KNOWN_URL),
            process.env.TOKEN_X_CLIENT_ID,
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
