// @vitest-environment jsdom
import { afterEach, expect, test } from 'vitest';
import { configFromPage } from './appConfig.ts';
import { APP_CONFIG_ID } from '#shared/types/appConfig.ts';

afterEach(() => {
	document.getElementById(APP_CONFIG_ID)?.remove();
});

test('reads the config the server wrote into the page', () => {
	const config = {
		origin: 'https://www.nav.no',
		authUrl: 'https://www.nav.no/person/nav-dekoratoren-api/auth',
		loginUrl: 'https://login.nav.no/oauth2/login',
		telemetryUrl: 'https://telemetry.nav.no/collect',
	};
	const script = document.createElement('script');
	script.type = 'application/json';
	script.id = APP_CONFIG_ID;
	script.textContent = JSON.stringify(config);
	document.body.append(script);

	expect(configFromPage()).toEqual(config);
});

test('says so when the page has none', () => {
	expect(() => configFromPage()).toThrow('The page has no #app-config');
});
