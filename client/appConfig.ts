import { APP_CONFIG_ID, type AppConfig } from '#shared/types/appConfig.ts';

let config: AppConfig | undefined;

// The app is handed its config before it renders: by main-client.tsx in the browser, from the page, and by
// main-server.tsx on the server, from the server
export const setConfig = (value: AppConfig) => {
	config = value;
};

export const getConfig = (): AppConfig => {
	if (!config) {
		throw new Error('The app was asked for its config before it was given one');
	}
	return config;
};

// What the server wrote into the page (server/site/page.ts)
export const configFromPage = (): AppConfig => {
	const json = document.getElementById(APP_CONFIG_ID)?.textContent;
	if (!json) {
		throw new Error(`The page has no #${APP_CONFIG_ID}`);
	}
	return JSON.parse(json);
};
