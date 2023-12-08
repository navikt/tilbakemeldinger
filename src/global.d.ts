/// <reference types="vite/client" />

declare global {
    interface ImportMeta {
        env: {
            VITE_APP_BASEPATH: string;
            VITE_ENV: 'prod' | 'dev' | 'localhost';
        };
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            APP_PORT: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}

export {};
