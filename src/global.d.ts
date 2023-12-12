/// <reference types="vite/client" />

declare global {
    interface ImportMeta {
        env: {
            VITE_APP_BASEPATH: string;
            VITE_APP_ORIGIN: string;
            VITE_ENV: 'prod' | 'dev' | 'localhost';
        };
    }
}

export {};
