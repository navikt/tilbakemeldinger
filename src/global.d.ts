/// <reference types="vite/client" />

declare global {
    interface ImportMeta {
        env: {
            APP_BASEPATH: string;
        };
    }
}
