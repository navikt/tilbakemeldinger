declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_APP_BASEPATH: string;
            APP_PORT: string;
            ENV: 'prod' | 'dev' | 'localhost';
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {};
