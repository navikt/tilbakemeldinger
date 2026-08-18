import { defineConfig } from 'eslint/config';
import reactPlugin from '@eslint-react/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

// Clean globals to remove any with whitespace
const cleanGlobals = Object.fromEntries(
    Object.entries(globals.browser).map(([key, value]) => [key.trim(), value])
);

export default defineConfig([
    {
        ignores: ['**/node_modules/**', '**/dist/**'],
    },
    {
        // Config is defined once, in env.schema.ts, and read through the two
        // validated accessors. Without this rule the next PR reintroduces
        // scattered process.env reads.
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        ignores: ['env.schema.ts', 'server/env.ts', 'vite.config.ts'],
        rules: {
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        "MemberExpression[object.object.name='process'][object.property.name='env']",
                    message:
                        'Les konfigurasjon fra server/env.ts (eller src/env.ts), ikke process.env. Definisjonen ligger i env.schema.ts.',
                },
            ],
        },
    },
    {
        // The browser bundle must stay free of zod and of raw env reads.
        files: ['src/**/*.{ts,tsx}'],
        ignores: ['src/env.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    paths: [
                        {
                            name: 'zod',
                            message:
                                'zod må ikke havne i klientbundelen — VITE_*-variabler valideres på byggetidspunkt i vite.config.ts.',
                        },
                    ],
                    patterns: [
                        {
                            group: ['**/env.schema*'],
                            message:
                                'Importer typen fra src/env.ts i stedet — env.schema.ts drar med seg zod.',
                        },
                    ],
                },
            ],
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        "MemberExpression[object.object.type='MetaProperty'][object.property.name='env'][property.name=/^VITE_/]",
                    message:
                        'Les konfigurasjon fra src/env.ts, ikke import.meta.env direkte.',
                },
            ],
        },
    },
    {
        extends: [
            ...compat.extends(
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended'
            ),
            reactPlugin.configs['recommended-typescript'],
        ],

        plugins: {
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: cleanGlobals,
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'off',
            '@eslint-react/exhaustive-deps': 'off',
            '@eslint-react/set-state-in-effect': 'off',
        },
    },
]);
