declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_APP_BASEPATH: string;
            VITE_APP_ORIGIN: string;
            APP_PORT: string;
            ENV: 'prod' | 'dev' | 'localhost';
            NODE_ENV: 'development' | 'production';
            NORG2_ORIGIN: string;
        }
    }
}

export {};
