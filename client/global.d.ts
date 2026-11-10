/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_BASEPATH: string;
	readonly VITE_APP_ORIGIN: string;
	readonly VITE_ENV: 'prod' | 'dev' | 'localhost';
	readonly VITE_TELEMETRY_URL: string;
}
