import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Handler } from 'hono';
import { LRUCache } from 'lru-cache';
import { raw } from '@itsy/html';
import { frame, type FramePart } from '@itsy/html/frame';
import { fetchDecoratorHtml, type DecoratorElements } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import type { ViteDevServer } from 'vite';
import { devAssets, entry, manifestAssets, type Manifest } from './assets.ts';
import { env } from '#server/utils/environment.ts';
import { getBreadcrumbsFromPathname } from '#shared/breadcrumbs.ts';
import type { Locale } from '#shared/locale.ts';
import type { SsrRender } from '#shared/types/ssr.ts';
import type { AppEnv } from '#server/types.ts';

// A page is the app rendered on the server, in a document with Nav's decorator around it

type SsrModule = { render: SsrRender; base: string };
type Rendered = ReturnType<SsrRender>;
type Renderer = { render: SsrRender; assets: FramePart[] };

// In production: the built SSR bundle, and the client build's manifest. A missing one stops the server at startup
const createProdRenderer = async (): Promise<Renderer> => {
	const manifestPath = fileURLToPath(import.meta.resolve('#dist/client/.vite/manifest.json'));
	const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
	if (!manifest[entry]) {
		throw new Error(`${entry} is missing from ${manifestPath}`);
	}
	// this is a variable instead of a literal in 'import'
	// because TS is crazy and tries to resolve it immediately
	const ssrEntry = '#dist/ssr/main-server.js';
	const { render, base }: SsrModule = await import(/* @vite-ignore */ ssrEntry);

	// The app's HTML depends only on the path. A failed render throws, so it isn't cached
	const cache = new LRUCache<string, Rendered>({ max: 100 });

	return {
		render: (path) => {
			const cached = cache.get(path);
			if (cached) {
				return cached;
			}
			const rendered = render(path);
			cache.set(path, rendered);
			return rendered;
		},
		assets: manifestAssets(manifest, base),
	};
};

// In development, the Vite dev server serves the app (see vite.config.ts), and loads its latest code for each page
const devRenderer = async (vite: ViteDevServer | undefined): Promise<Renderer> => {
	if (!vite) {
		throw new Error('NODE_ENV=development runs under the Vite dev server: use `pnpm dev`');
	}
	const { render, base } = (await vite.ssrLoadModule('/client/main-server.tsx')) as SsrModule;

	return {
		render: (path) => {
			try {
				return render(path);
			} catch (e) {
				if (e instanceof Error) {
					vite.ssrFixStacktrace(e);
				}
				throw e;
			}
		},
		assets: devAssets(base),
	};
};

// When rendering fails, the page goes out without the app, and the browser renders it (main-client.tsx).
// The path may well be a page, so it isn't a 404
const renderOrEmpty = (render: SsrRender, path: string): Rendered => {
	try {
		return render(path);
	} catch (e) {
		console.error(`Rendering ${path} failed: ${e instanceof Error ? (e.stack ?? e.message) : String(e)}`);
		return { html: '', head: { title: 'www.nav.no' }, status: 200 };
	}
};

// Nav's header and footer, always from the production decorator. The library caches them
const decorate = (path: string, locale: Locale) =>
	fetchDecoratorHtml({
		env: 'prod',
		params: {
			context: 'privatperson',
			language: locale,
			breadcrumbs: getBreadcrumbsFromPathname(path, locale),
			availableLanguages: [
				{ locale: 'nb', handleInApp: true },
				{ locale: 'nn', handleInApp: true },
				{ locale: 'en', handleInApp: true },
			],
		},
	});

const fontPreload: FramePart = {
	tag: 'link',
	attrs: {
		rel: 'preload',
		href: 'https://cdn.nav.no/aksel/fonts/SourceSans3-normal.woff2',
		as: 'font',
		type: 'font/woff2',
		crossorigin: true,
	},
};

const pageDocument = (locale: Locale, { html, head }: Rendered, assets: FramePart[], decorator: DecoratorElements) =>
	frame({
		lang: locale,
		title: head.title,
		description: head.description,
		head: [
			fontPreload,
			...(head.canonical ? [{ tag: 'link', attrs: { rel: 'canonical', href: head.canonical } }] : []),
			...(head.noindex ? [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } }] : []),
			...assets,
			raw(decorator.DECORATOR_HEAD_ASSETS),
		],
		header: raw(decorator.DECORATOR_HEADER),
		// <main> gets the app's elements and nothing else, so hydration finds what the browser renders
		content: raw(html),
		attrs: { main: { class: 'tilbakemeldingerApp' } },
		footer: raw(decorator.DECORATOR_FOOTER),
		scripts: raw(decorator.DECORATOR_SCRIPTS),
	}).markup;

export const createPageHandler = async (): Promise<Handler<AppEnv>> => {
	const prodRenderer = env.NODE_ENV === 'development' ? undefined : await createProdRenderer();

	return async (c) => {
		const { path } = c.req;
		// The route only matches nb, nn and en
		const locale = c.req.param('locale') as Locale;
		const { render, assets } = prodRenderer ?? (await devRenderer(c.env.vite));

		const app = renderOrEmpty(render, path);
		const decorator = await decorate(path, locale);

		return c.html(pageDocument(locale, app, assets, decorator), app.status);
	};
};
