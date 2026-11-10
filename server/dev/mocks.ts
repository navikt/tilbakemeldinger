import { Hono } from 'hono';
import authInfo from './data/authInfo.json' with { type: 'json' };
import enheter from './data/enheter.json' with { type: 'json' };
import fodselsnr from './data/fodselsnr.json' with { type: 'json' };
import kontaktInfo from './data/kontaktInfo.json' with { type: 'json' };
import { env } from '#server/utils/environment.ts';
import type { AppEnv } from '#server/types.ts';

// Locally (ENV=localhost), stand-ins for what the app talks to on NAIS, at the URLs that .env.development and
// client/Environments.ts point to. To try the forms logged in, set "authenticated" to true in data/authInfo.json
export const devMocks = new Hono<AppEnv>();

// The browser's calls outside the app: the decorator's login status, and the user's contact details
devMocks.get('/person/nav-dekoratoren-api/auth', (c) => c.json(authInfo));
devMocks.get('/tms-personopplysninger-api/kontaktinformasjon', (c) => c.json(kontaktInfo));

// The real one reads the ID-porten token, which the login in front of the app adds on NAIS
devMocks.get(`${env.VITE_APP_BASEPATH}/tilbakemeldinger/api/fodselsnr`, (c) => c.json(fodselsnr));

// The server's calls: norg2 (NORG2_ORIGIN) and tilbakemeldingsmottak-api (API_URL)
devMocks.get('/norg2/api/v1/enhet', (c) => c.json(enheter));
devMocks.post('/rest/*', (c) => c.json({}));
