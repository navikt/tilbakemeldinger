// What the app is told about where it runs. The server makes it from its own environment and hands it over:
// to the renderer when it renders a page, and to the browser as JSON in that page (server/site/page.ts)
export type AppConfig = {
	env: 'prod' | 'dev' | 'localhost';
	// Where the app is served from: https://www.nav.no
	origin: string;
	// Where the browser sends its telemetry. Unset locally
	telemetryUrl?: string;
};

// The id of that JSON in the page
export const APP_CONFIG_ID = 'app-config';
