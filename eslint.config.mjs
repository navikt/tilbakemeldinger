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
        ignores: ['**/node_modules/**', '**/dist/**', '**/_ssr-dist/**'],
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
