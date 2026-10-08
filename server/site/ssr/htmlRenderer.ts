import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LRUCache } from 'lru-cache';
import { buildHtmlTemplate, getTemplateWithDecorator } from './templateBuilder.ts';
import type { ViteDevServer } from 'vite';
import type { HelmetServerState } from 'react-helmet-async';
import type { SsrRender } from '#shared/types/ssr.ts';

export type HtmlRenderer = (url: string) => Promise<string>;

type SsrModule = { render: SsrRender };

const processTemplate = async (templateHtml: string, appHtml: string, helmet?: HelmetServerState) => {
	return (
		templateHtml
			// Ensure we replace the line and indentation markers
			// <main> must contain only the app's elements
			// otherwise hydration sees text nodes that the client never renders
			.replace(/\s*<!--ssr-app-html-->\s*/, () => appHtml)
			.replace('<title>%%TITLE%%</title>', helmet?.title.toString() ?? '')
			.replace('<template>%%DESCRIPTION%%</template>', helmet?.meta.toString() ?? '')
			.replace('<template>%%CANONICAL%%</template>', helmet?.link.toString() ?? '')
	);
};

const prodTemplatePath = fileURLToPath(import.meta.resolve('#dist/client/index.html'));

export const createProdRender = async (): Promise<HtmlRenderer> => {
	if (!fs.existsSync(prodTemplatePath)) {
		throw new Error(`HTML template not found at ${prodTemplatePath}`);
	}
	// this is a variable instead of a literal in 'import'
	// because TS is crazy and tries to resolve it immediately
	const ssrEntry = '#dist/ssr/main-server.js';
	const { render }: SsrModule = await import(/* @vite-ignore */ ssrEntry);

	// Rendered pages by URL (path and query), for 10 minutes
	const cache = new LRUCache<string, string>({
		ttl: 600 * 1000,
		max: 100,
		fetchMethod: (url) => prodRender(render, url),
	});

	return (url) => cache.forceFetch(url);
};

const prodRender = async (render: SsrModule['render'], url: string) => {
	const template = await getTemplateWithDecorator(url, prodTemplatePath);

	try {
		const { html, helmet } = render(url);
		return processTemplate(template, html, helmet);
	} catch (e) {
		console.error(`Rendering failed ${e}}`);
		return processTemplate(template, '');
	}
};

const devErrorHtml = (e: Error) => {
	return `
        <div style='max-width: 1344px;width: 100%;margin: 1rem auto'>
            <span>Server rendering error: ${e}</span>
            <div style='font-size: 0.75rem; margin-top: 1rem'>
                <code>${e.stack}</code>
            </div>
        </div>`;
};

// parse5 (used by Vite's transformIndexHtml) rejects </link> closing tags
// because <link> is a void element. The decorator may inject these in dev.
const stripVoidElementClosingTags = (html: string) => html.replace(/<\/link>/gi, '');

export const devRender = async (vite: ViteDevServer | undefined, url: string) => {
	if (!vite) {
		throw new Error('NODE_ENV=development runs under the Vite dev server: use `pnpm dev`');
	}

	const template = await buildHtmlTemplate(path.join(vite.config.root, 'index.html'));
	const html = await vite.transformIndexHtml(url, stripVoidElementClosingTags(template));

	try {
		const { render } = (await vite.ssrLoadModule('/client/main-server.tsx')) as SsrModule;
		const { html: appHtml, helmet } = render(url);
		return processTemplate(html, appHtml, helmet);
	} catch (e) {
		const error = e instanceof Error ? e : new Error(String(e));
		vite.ssrFixStacktrace(error);
		console.error(`Dev render error: ${error} \n ${error.stack}`);
		return processTemplate(html, devErrorHtml(error));
	}
};
