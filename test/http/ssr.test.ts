import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import nb from '../../common/language/nb';
import nn from '../../common/language/nn';
import en from '../../common/language/en';
import { APP_ORIGIN, BASE, parseHtml, startServer, type TestServer } from './harness';
import { expectNoUnexpectedHosts } from './fixtures';

const translations = { nb, nn, en };
const locales = ['nb', 'nn', 'en'] as const;

// h1 is not always the same text as <title>
const pages = [
	{
		path: '/tilbakemeldinger',
		title: 'tilbakemeldinger.tilbakemeldinger.sidetittel',
		description: 'seo.tilbakemeldinger.description',
		h1: 'tilbakemeldinger.tilbakemeldinger.sidetittel',
	},
	{
		path: '/tilbakemeldinger/serviceklage',
		title: 'tilbakemeldinger.serviceklage.sidetittel',
		description: 'seo.serviceklage.description',
		h1: 'tilbakemeldinger.serviceklage.sidetittel',
	},
	{
		path: '/tilbakemeldinger/feil-og-mangler',
		title: 'tilbakemeldinger.feil-og-mangler.sidetittel',
		description: 'seo.feil-og-mangler.description',
		h1: 'tilbakemeldinger.feilogmangler.form.tittel',
	},
	{
		path: '/tilbakemeldinger/ros-til-nav',
		title: 'tilbakemeldinger.ros-til-nav.sidetittel',
		description: 'seo.ros-til-nav.description',
		h1: 'tilbakemeldinger.ros.form.tittel',
	},
];

const decoratorRequests = (server: TestServer) =>
	server.stub.find('www.nav.no', '/dekoratoren/ssr').map((r) => ({
		context: r.query.get('context'),
		language: r.query.get('language'),
		breadcrumbs: JSON.parse(r.query.get('breadcrumbs') ?? 'null'),
		availableLanguages: JSON.parse(r.query.get('availableLanguages') ?? 'null'),
	}));

describe('server-side rendered pages', () => {
	let server: TestServer;

	beforeAll(async () => {
		server = await startServer();
	});

	afterAll(async () => {
		expectNoUnexpectedHosts(server);
		await server.stop();
	});

	test('fetches the CSP from the dev decorator at startup', () => {
		expect(server.stub.find('dekoratoren.ekstern.dev.nav.no', '/api/csp').length).toBeGreaterThan(0);
	});

	describe.each(locales)('%s', (locale) => {
		test.each(pages)('$path', async (page) => {
			const res = await server.fetch(`${BASE}/${locale}${page.path}`);

			expect(res.status).toBe(200);
			expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
			expect(res.headers.get('content-encoding')).toBe('gzip');
			expect(res.headers.get('content-security-policy')).toContain('https://stub.test');

			const doc = parseHtml(await res.text());
			const t = translations[locale];

			expect(doc.head.querySelector('title')?.textContent).toBe(`${t[page.title]} - www.nav.no`);
			expect(doc.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(t[page.description]);
			expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
				`${APP_ORIGIN}${BASE}/${locale}${page.path}`
			);
			expect(doc.querySelector('#maincontent h1')?.textContent).toBe(t[page.h1]);

			// Decorator injected server-side
			expect(doc.head.querySelector('[data-stub="head-assets"]')).not.toBeNull();
			expect(doc.body.querySelector('[data-stub="decorator-header"]')).not.toBeNull();
			expect(doc.body.querySelector('[data-stub="decorator-footer"]')).not.toBeNull();
			expect(doc.body.querySelector('[data-stub="decorator-scripts"]')).not.toBeNull();

			// The page decorator always comes from prod, regardless of ENV
			const decorator = decoratorRequests(server).find(
				(d) => d.breadcrumbs?.at(-1)?.url === `${BASE}/${locale}${page.path}`
			);
			expect(decorator).toMatchObject({
				context: 'privatperson',
				language: locale,
				availableLanguages: [
					{ locale: 'nb', handleInApp: true },
					{ locale: 'nn', handleInApp: true },
					{ locale: 'en', handleInApp: true },
				],
			});
		});
	});

	test('nn breadcrumbs link the base crumb to nb', () => {
		const decorator = decoratorRequests(server).find(
			(d) => d.breadcrumbs?.at(-1)?.url === `${BASE}/nn/tilbakemeldinger/serviceklage`
		);
		expect(decorator?.breadcrumbs).toEqual([
			{ url: `${BASE}/nb`, title: 'Kontakt oss', handleInApp: false },
			{ url: `${BASE}/nn/tilbakemeldinger`, title: 'Tilbakemelding', handleInApp: true },
			{ url: `${BASE}/nn/tilbakemeldinger/serviceklage`, title: 'Klage på service', handleInApp: true },
		]);
	});

	test('serves a repeated request (cache hit) with the same body and CSP', async () => {
		const url = `${BASE}/nb/tilbakemeldinger/ros-til-nav?cache=repeat`;
		const first = await server.fetch(url);
		const second = await server.fetch(url);

		expect(second.status).toBe(200);
		expect(await second.text()).toBe(await first.text());
		expect(second.headers.get('content-security-policy')).toBe(first.headers.get('content-security-policy'));
		expect(second.headers.get('content-security-policy')).toBeTruthy();
	});

	test('answers HEAD for pages', async () => {
		const res = await server.fetch(`${BASE}/nb/tilbakemeldinger/serviceklage?method=head`, { method: 'HEAD' });

		expect(res.status).toBe(200);
		expect(res.headers.get('content-type')).toBe('text/html; charset=utf-8');
		expect(await res.text()).toBe('');
	});

	test('renders an empty app for a URL without locale (the client redirects)', async () => {
		const res = await server.fetch(`${BASE}/tilbakemeldinger/serviceklage?locale=none`);

		expect(res.status).toBe(200);
		expect(res.headers.get('content-security-policy')).toBeTruthy();

		const doc = parseHtml(await res.text());
		const main = doc.querySelector('#maincontent');
		expect(main?.children.length).toBe(0);
		expect(main?.textContent?.trim()).toBe('');
		expect(doc.head.querySelector('title')?.textContent).toBe('');
		expect(doc.head.querySelector('meta[name="description"]')).toBeNull();
		expect(doc.head.querySelector('link[rel="canonical"]')).toBeNull();

		const decorator = decoratorRequests(server).find((d) =>
			d.breadcrumbs?.at(-1)?.url.startsWith(`${BASE}/nb/tilbakemeldinger/serviceklage?locale=none`)
		);
		expect(decorator?.language).toBe('nb');
	});
});
