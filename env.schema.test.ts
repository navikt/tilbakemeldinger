import { describe, test, expect } from 'vitest';
import * as z from 'zod';
import { serverEnvSchema, clientEnvSchema, SECRET_KEYS } from './env.schema.js';

const localhostEnv = {
    ENV: 'localhost',
    APP_PORT: '9001',
    VITE_APP_BASEPATH: '/person/kontakt-oss',
    NORG2_ORIGIN: 'https://norg2.dev-fss-pub.nais.io',
    MOCK_ACCESS_TOKEN: 'mock',
};

const clusterEnv = {
    ENV: 'dev',
    APP_PORT: '9001',
    VITE_APP_BASEPATH: '/person/kontakt-oss',
    NORG2_ORIGIN: 'https://norg2.dev-fss-pub.nais.io',
    API_URL: 'http://tilbakemeldingsmottak-api.teamserviceklage',
    TOKEN_X_WELL_KNOWN_URL: 'https://tokenx.example/.well-known',
    TOKEN_X_CLIENT_ID: 'client',
    TOKEN_X_PRIVATE_JWK: '{"kid":"abc","alg":"RS256"}',
    AZURE_APP_TENANT_ID: 'tenant',
    AZURE_APP_CLIENT_ID: 'client',
    AZURE_APP_CLIENT_SECRET: 'secret',
};

describe('serverEnvSchema', () => {
    test('accepts a localhost environment without cluster secrets', () => {
        const result = serverEnvSchema.safeParse(localhostEnv);
        expect(result.success).toBe(true);
    });

    test('accepts a cluster environment', () => {
        const result = serverEnvSchema.safeParse(clusterEnv);
        expect(result.success).toBe(true);
    });

    test('coerces APP_PORT to a number', () => {
        const result = serverEnvSchema.parse(localhostEnv);
        expect(result.APP_PORT).toBe(9001);
    });

    test('parses TOKEN_X_PRIVATE_JWK into an object', () => {
        const result = serverEnvSchema.parse(clusterEnv);
        if (result.ENV === 'localhost') throw new Error('expected cluster');
        expect(result.TOKEN_X_PRIVATE_JWK.kid).toBe('abc');
    });

    test('reports every missing cluster secret at once', () => {
        const { TOKEN_X_CLIENT_ID, AZURE_APP_CLIENT_SECRET, ...rest } =
            clusterEnv;
        const result = serverEnvSchema.safeParse(rest);
        expect(result.success).toBe(false);
        const paths = result.error!.issues.map((i) => i.path[0]);
        expect(paths).toContain('TOKEN_X_CLIENT_ID');
        expect(paths).toContain('AZURE_APP_CLIENT_SECRET');
    });

    test('rejects a localhost environment missing MOCK_ACCESS_TOKEN', () => {
        const { MOCK_ACCESS_TOKEN, ...rest } = localhostEnv;
        expect(serverEnvSchema.safeParse(rest).success).toBe(false);
    });

    test('rejects regex metacharacters in VITE_APP_BASEPATH', () => {
        const result = serverEnvSchema.safeParse({
            ...localhostEnv,
            VITE_APP_BASEPATH: '/person|kontakt',
        });
        expect(result.success).toBe(false);
    });

    test('rejects an unknown ENV with a single discriminator error', () => {
        const result = serverEnvSchema.safeParse({
            ...localhostEnv,
            ENV: 'banana',
        });
        expect(result.success).toBe(false);
        expect(result.error!.issues).toHaveLength(1);
    });

    test('never echoes a secret value into the formatted error', () => {
        const result = serverEnvSchema.safeParse({
            ...clusterEnv,
            TOKEN_X_PRIVATE_JWK: 'LEAKCANARY-not-json',
            AZURE_APP_CLIENT_SECRET: '',
        });
        expect(result.success).toBe(false);
        const output = z.prettifyError(result.error!);
        expect(output).not.toContain('LEAKCANARY');
        expect(output).toContain('must be a JSON object');
    });
});

describe('clientEnvSchema', () => {
    test('accepts values the browser actually receives', () => {
        const result = clientEnvSchema.safeParse({
            VITE_ENV: 'localhost',
            VITE_APP_BASEPATH: '/person/kontakt-oss',
            VITE_APP_ORIGIN: 'http://localhost:9001',
        });
        expect(result.success).toBe(true);
    });

    test('leaves values untransformed, since Vite inlines the raw string', () => {
        const input = {
            VITE_ENV: 'prod' as const,
            VITE_APP_BASEPATH: '/person/kontakt-oss',
            VITE_APP_ORIGIN: 'https://www.nav.no',
        };
        expect(clientEnvSchema.parse(input)).toEqual(input);
    });
});

describe('SECRET_KEYS', () => {
    test('covers every field holding a credential', () => {
        expect([...SECRET_KEYS].sort()).toEqual([
            'AZURE_APP_CLIENT_SECRET',
            'MOCK_ACCESS_TOKEN',
            'TOKEN_X_PRIVATE_JWK',
        ]);
    });
});
