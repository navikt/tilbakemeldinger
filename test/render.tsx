// The only file that knows which renderer the app uses
import { cleanup, render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { getGlobalDispatcher, MockAgent, setGlobalDispatcher } from 'undici';
import { afterEach, expect, vi } from 'vitest';
import { AppRoot } from '#client/index.tsx';
import Environment from '#client/Environments.ts';
import nb from '#shared/language/nb.ts';

// Faro patches fetch and ships telemetry; not something the forms depend on
vi.mock('@nais/apm', () => ({ captureException: vi.fn() }));

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
// other request fails. A list answers one request per reply, and its last reply keeps answering.
type Api = {
	auth?: Reply | Reply[];
	fodselsnr?: Reply | Reply[];
	kontaktinformasjon?: Reply | Reply[];
	enheter?: Reply | Reply[];
	mottak?: Reply | Reply[];
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

// Puts the browser at `path`, with the browser's calls to our API, the decorator
// auth API and personopplysninger answered from `api`
const openPage = (path: string, api: Api) => {
	window.history.replaceState(null, '', `${BASE}${path}`);
	// The tags the server writes into <head> (client/main-server.tsx), which the app keeps up to date
	document.head.innerHTML = '<title></title><meta name="description"><link rel="canonical">';

	// Provided by the decorator
	const analytics = vi.fn((_event: { eventName: string; eventData?: Record<string, unknown> }) => Promise.resolve());
	Object.assign(window, { dekoratorenAnalytics: analytics });

	const posts: Post[] = [];
	const served = new Set<Endpoint>();

	agent = new MockAgent();
	agent.disableNetConnect();
	setGlobalDispatcher(agent);

	for (const [name, { url, method }] of Object.entries(endpoints) as [Endpoint, (typeof endpoints)[Endpoint]][]) {
		const { origin, pathname } = new URL(url);
		const replies = [api[name] ?? defaults[name]].flat();

		for (const [i, { status = 200, body }] of replies.entries()) {
			const scope = agent
				.get(origin)
				.intercept({ path: name === 'mottak' ? (p) => p.startsWith(pathname) : pathname, method })
				.reply(
					status,
					async (opts) => {
						if (method === 'POST') {
							posts.push({ path: opts.path, body: JSON.parse(await readBody(opts.body)) });
						}
						served.add(name);
						return body === undefined ? '' : JSON.stringify(body);
					},
					{ headers: { 'content-type': 'application/json' } }
				);
			if (i === replies.length - 1) {
				scope.persist();
			}
		}
	}

	// Waits until these endpoints have answered the app, plus a timer tick for
	// it to read and apply the data, e.g. fodselsnr/kontaktinfo before the user
	// starts filling in
	const settled = async (...names: Endpoint[]) => {
		await waitFor(() => expect([...served]).toEqual(expect.arrayContaining(names)));
		await new Promise((resolve) => setTimeout(resolve, 0));
	};

	return { posts, settled, analytics };
};

// The app as main-client.tsx renders it, minus StrictMode: in development it runs every effect twice on
// mount, which production never does, and the tests count what effects do (one pageview per title)
const app = <AppRoot />;

// Renders the whole app at `path`
export const renderApp = (path: string, api: Api = {}) => {
	const page = openPage(path, api);
	render(app);

	return { user: userEvent.setup(), ...page };
};

// Hydrates the server-rendered app in `main` at `path`, the way main-client.tsx does
export const hydrateApp = (path: string, main: HTMLElement, api: Api = {}) => {
	const page = openPage(path, api);
	const onRecoverableError = vi.fn();
	render(app, { container: main, hydrate: true, onRecoverableError });

	return { onRecoverableError, ...page };
};
