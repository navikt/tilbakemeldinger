import * as client from 'openid-client';
import { logger } from '@navikt/navno-logger';
import { importJWK } from 'jose';
import { env } from '#server/env.ts';

let _config: client.Configuration | undefined;

function jwk() {
	if (!env.TOKEN_X_PRIVATE_JWK) throw new TypeError('Miljøvariabelen "TOKEN_X_PRIVATE_JWK må være satt');
	return JSON.parse(env.TOKEN_X_PRIVATE_JWK);
}

async function config() {
	if (_config === undefined) {
		if (!env.TOKEN_X_WELL_KNOWN_URL) throw new TypeError('Miljøvariabelen "TOKEN_X_WELL_KNOWN_URL må være satt');
		if (!env.TOKEN_X_CLIENT_ID) throw new TypeError('Miljøvariabelen "TOKEN_X_CLIENT_ID må være satt');

		const _jwk = jwk();
		const privateKey = await importJWK(_jwk, _jwk.alg ?? 'RS256');

		_config = await client.discovery(
			new URL(env.TOKEN_X_WELL_KNOWN_URL),
			env.TOKEN_X_CLIENT_ID,
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
	const configuration = await config();

	try {
		const tokens = await client.genericGrantRequest(configuration, 'urn:ietf:params:oauth:grant-type:token-exchange', {
			subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
			audience,
			subject_token,
		});
		return tokens.access_token;
	} catch (err) {
		if (err instanceof client.ResponseBodyError) {
			logger.error('TokenX token exchange failed', {
				status: err.status,
				error: err.error,
				description: err.error_description,
			});
		}
		throw err;
	}
}
