export default {
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // Handle CSS imports
        '\\.module\\.(css|scss)$': 'identity-obj-proxy',
        '\\.(css|scss)$': 'identity-obj-proxy',
        // Handle image imports
        '\\.(jpg|jpeg|png|gif|webp|svg)$':
            '<rootDir>/test/__mocks__/fileMock.js',
        // Handle module aliases
        '^src/(.*)$': '<rootDir>/src/$1',
        '^common/(.*)$': '<rootDir>/common/$1',
        '^server/(.*)$': '<rootDir>/server/src/$1',
    },
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: 'tsconfig.json',
            },
        ],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transformIgnorePatterns: ['/node_modules/(?!(@testing-library))'],
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    roots: ['<rootDir>/src', '<rootDir>/common', '<rootDir>/server/src'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        'common/**/*.{js,jsx,ts,tsx}',
        'server/src/**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
