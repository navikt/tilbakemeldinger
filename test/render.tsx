// The only file that knows which renderer the app uses. The React 19 swap
// changes the import below to @testing-library/react and nothing else.
import { cleanup, render } from '@testing-library/preact';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { getGlobalDispatcher, MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, expect, vi } from 'vitest';
import { AppRoot } from '#client/index.tsx';
import Environment from '#client/Environments.ts';
import nb from '#shared/language/nb.ts';

// Faro patches fetch and ships telemetry; not something the forms depend on
vi.mock('@nais/apm', () => ({ init: vi.fn(), captureException: vi.fn() }));

// The app's fetch runs on Node's built-in undici; the mock replaces the network under it
const realDispatcher = getGlobalDispatcher();
let agent: MockAgent | undefined;

afterEach(async () => {
	cleanup();
	vi.restoreAllMocks();
	setGlobalDispatcher(realDispatcher);
	await agent?.close();
	agent = undefined;
});

export const BASE = '/person/kontakt-oss';

export const t = (id: string) => {
	if (!nb[id]) throw new Error(`Missing nb translation: ${id}`);
	return nb[id];
};

export const ENHETER = [
	{ enhetNr: '0301', navn: 'Nav Oslo', type: 'LOKAL', status: 'AKTIV' },
	{ enhetNr: '4812', navn: 'Nav Bergen', type: 'LOKAL', status: 'AKTIV' },
];

type Reply = { status?: number; body?: unknown };

// Replies per endpoint the browser talks to. With the network disabled, any
// other request fails.
type Api = {
	auth?: Reply;
	fodselsnr?: Reply;
	kontaktinformasjon?: Reply;
	enheter?: Reply;
	mottak?: Reply;
};

type Endpoint = keyof Api;

const { appUrl, authUrl, personInfoApiUrl } = Environment();

const endpoints: Record<Endpoint, { url: string; method: 'GET' | 'POST' }> = {
	auth: { url: authUrl, method: 'GET' },
	fodselsnr: { url: `${appUrl}/api/fodselsnr`, method: 'GET' },
	kontaktinformasjon: { url: `${personInfoApiUrl}/kontaktinformasjon`, method: 'GET' },
	enheter: { url: `${appUrl}/api/enheter`, method: 'GET' },
	// Prefix: one of /mottak/ros, /mottak/serviceklage, /mottak/feil-og-mangler
	mottak: { url: `${appUrl}/api/mottak/`, method: 'POST' },
};

const defaults: Required<Api> = {
	auth: { body: { authenticated: false } },
	fodselsnr: { status: 401 },
	kontaktinformasjon: { status: 401 },
	enheter: { body: ENHETER },
	mottak: { body: {} },
};

// fetch hands request bodies to the dispatcher as a stream
const readBody = async (body: unknown) => {
	if (typeof body === 'string') return body;
	const chunks: Buffer[] = [];
	for await (const chunk of body as AsyncIterable<Uint8Array>) chunks.push(Buffer.from(chunk));
	return Buffer.concat(chunks).toString('utf-8');
};

export type Post = { path: string; body: unknown };

// Renders the whole app at `path` the way main-client.tsx does, with the
// browser's calls to our API, the decorator auth API and personopplysninger
// answered from `api`
export const renderApp = (path: string, api: Api = {}) => {
	window.history.replaceState(null, '', `${BASE}${path}`);
	window.scrollTo = () => {};

	// Provided by the decorator
	Object.assign(window, { dekoratorenAnalytics: () => Promise.resolve() });

	const posts: Post[] = [];
	const served = new Set<Endpoint>();

	agent = new MockAgent();
	agent.disableNetConnect();
	setGlobalDispatcher(agent);

	for (const [name, { url, method }] of Object.entries(endpoints) as [Endpoint, (typeof endpoints)[Endpoint]][]) {
		const { origin, pathname } = new URL(url);
		const { status = 200, body } = api[name] ?? defaults[name];

		agent
			.get(origin)
			.intercept({ path: name === 'mottak' ? (p) => p.startsWith(pathname) : pathname, method })
			.reply(
				status,
				async (opts) => {
					if (method === 'POST') {
						posts.push({ path: String(opts.path), body: JSON.parse(await readBody(opts.body)) });
					}
					served.add(name);
					return body === undefined ? '' : JSON.stringify(body);
				},
				{ headers: { 'content-type': 'application/json' } }
			)
			.persist();
	}

	render(
		<React.StrictMode>
			<HelmetProvider>
				<BrowserRouter basename={BASE}>
					<AppRoot />
				</BrowserRouter>
			</HelmetProvider>
		</React.StrictMode>
	);

	// Waits until these endpoints have answered the app, plus a timer tick for
	// it to read and apply the data, e.g. fodselsnr/kontaktinfo before the user
	// starts filling in
	const settled = async (...names: Endpoint[]) => {
		await waitFor(() => expect([...served]).toEqual(expect.arrayContaining(names)));
		await new Promise((resolve) => setTimeout(resolve, 0));
	};

	return { user: userEvent.setup(), posts, settled };
};
