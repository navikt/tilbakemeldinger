import { defineConfig } from 'eslint/config';
import react from 'eslint-plugin-react';
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
        extends: compat.extends(
            'eslint:recommended',
            'plugin:react/recommended',
            'plugin:@typescript-eslint/recommended'
        ),

        plugins: {
            react,
            '@typescript-eslint': typescriptEslint,
        },

        languageOptions: {
            globals: cleanGlobals,
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
]);
