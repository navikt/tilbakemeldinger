declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_APP_BASEPATH: string;
            VITE_APP_ORIGIN: string;
            VITE_EDITORIAL_FRONTPAGE_ORIGIN: string;
            APP_PORT: string;
            ENV: 'prod' | 'dev' | 'localhost';
            NODE_ENV: 'development' | 'production';
            NORG2_ORIGIN: string;
            API_URL: string;
            MOCK_ACCESS_TOKEN: string;
            TOKEN_X_WELL_KNOWN_URL: string;
            TOKEN_X_CLIENT_ID: string;
            TOKEN_X_PRIVATE_JWK: string;
            AZURE_APP_TENANT_ID: string;
            AZURE_APP_CLIENT_ID: string;
            AZURE_APP_CLIENT_SECRET: string;
        }
    }
}

export {};
