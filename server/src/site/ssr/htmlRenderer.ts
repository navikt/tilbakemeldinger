import fs from 'node:fs';
import { buildHtmlTemplate, getTemplateWithDecorator, templatePath } from './templateBuilder.js';
import type { ViteDevServer } from 'vite';
import { HelmetServerState } from 'react-helmet-async';

export type HtmlRenderer = (url: string) => Promise<string>;

// the shape build:ssr produces from src/main-server.tsx
type SsrModule = {
	render: (url: string) => { html: string; helmet?: HelmetServerState };
};

const processTemplate = async (templateHtml: string, appHtml: string, helmet?: HelmetServerState) => {
	return templateHtml
		.replace('<!--ssr-app-html-->', appHtml)
		.replace('<title>%%TITLE%%</title>', helmet?.title.toString() ?? '')
		.replace('<template>%%DESCRIPTION%%</template>', helmet?.meta.toString() ?? '')
		.replace('<template>%%CANONICAL%%</template>', helmet?.link.toString() ?? '');
};

export const createProdRender = async (): Promise<HtmlRenderer> => {
	if (!fs.existsSync(templatePath)) {
		throw new Error(`HTML template not found at ${templatePath}`);
	}
	// this is a variable instead of a literal in 'import'
	// because TS is crazy and tries to resolve it immediately
	const ssrEntry = '#dist/ssr/main-server.js';
	const { render }: SsrModule = await import(ssrEntry);

	return (url) => prodRender(render, url);
};

const prodRender = async (render: SsrModule['render'], url: string) => {
	const template = await getTemplateWithDecorator(url);

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

export const devRender =
	(vite: ViteDevServer): HtmlRenderer =>
	async (url) => {
		const template = await buildHtmlTemplate();
		const html = await vite.transformIndexHtml(url, stripVoidElementClosingTags(template));

		try {
			const { render } = (await vite.ssrLoadModule('/src/main-server.tsx')) as SsrModule;
			const { html: appHtml, helmet } = render(url);
			return processTemplate(html, appHtml, helmet);
		} catch (e) {
			const error = e instanceof Error ? e : new Error(String(e));
			vite.ssrFixStacktrace(error);
			console.error(`Dev render error: ${error} \n ${error.stack}`);
			return processTemplate(html, devErrorHtml(error));
		}
	};
