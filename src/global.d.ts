/// <reference types="vite/client" />

declare global {
    interface ImportMeta {
        env: {
            VITE_APP_BASEPATH: string;
        };
    }
}
