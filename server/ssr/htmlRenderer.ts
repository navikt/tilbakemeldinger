import type { ViteDevServer } from 'vite';
import { HelmetServerState } from 'react-helmet-async';
import { render } from '../../src/main-server.js';
import { getTemplateWithDecorator } from './templateBuilder.js';
import { Locale } from '../../common/locale.js';

export type HtmlRenderer = (url: string, locale: Locale) => Promise<string>;

const processTemplate = (
    templateHtml: string,
    appHtml: string,
    helmet?: HelmetServerState
) =>
    templateHtml
        .replace('<!--ssr-app-html-->', appHtml)
        .replace('<title>%%TITLE%%</title>', helmet?.title.toString() ?? '')
        .replace(
            '<template>%%DESCRIPTION%%</template>',
            helmet?.meta.toString() ?? ''
        )
        .replace(
            '<template>%%CANONICAL%%</template>',
            helmet?.link.toString() ?? ''
        );

// parse5, which Vite's transformIndexHtml uses, rejects the </link> closing tags
// the decorator injects.
const stripVoidElementClosingTags = (html: string) =>
    html.replace(/<\/link>/gi, '');

// In dev the template still carries source paths like /src/main-client.tsx.
// Vite serves those under its `base`, so without this the client entry 404s and
// the page ships SSR markup with no JavaScript behind it.
const applyDevTransforms = async (html: string, url: string) => {
    const vite = (globalThis as { __viteDevServer?: ViteDevServer })
        .__viteDevServer;

    if (!vite) {
        console.error(
            'Vite dev server unavailable; serving untransformed HTML'
        );
        return html;
    }

    return vite.transformIndexHtml(url, stripVoidElementClosingTags(html));
};

export const renderPage: HtmlRenderer = async (url, locale) => {
    let template = await getTemplateWithDecorator(url, locale);

    if (import.meta.env.DEV) {
        template = await applyDevTransforms(template, url);
    }

    try {
        const { html, helmet } = render(url);
        return processTemplate(template, html, helmet);
    } catch (e) {
        // Falling back to a shell means the client still renders, but the page
        // loses SSR silently - so log loudly enough to be found.
        console.error(
            `SSR failed for ${url}:\n${e instanceof Error ? e.stack : e}`
        );
        return processTemplate(template, '');
    }
};
