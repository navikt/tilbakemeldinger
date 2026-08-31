import type { ViteDevServer } from 'vite';
import { render } from '../../src/main-server.js';
import { getTemplateWithDecorator } from './templateBuilder.js';
import { Locale } from '../../common/locale.js';
import { appPathFromPathname } from '../../common/appPath.js';
import { getPageMetadata, PageMetadata } from '../../common/metadata.js';
import { env } from '../env.js';

export type HtmlRenderer = (url: string, locale: Locale) => Promise<string>;

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');

/*
 * The marker's surrounding whitespace is part of the match. #maincontent is the
 * hydration container, so the indentation around the marker would become a text
 * node beside the SSR markup — a node React never rendered, which fails
 * hydration and silently re-renders the whole page on the client. Matching it
 * here rather than writing index.html without the indentation keeps it working
 * whatever the formatter does to that file.
 */
const APP_HTML_MARKER = /\s*<!--ssr-app-html-->\s*/;

/*
 * Every replacement takes a function rather than a string. String replacements
 * treat `$&`, `$'` and friends as capture references, and both the rendered app
 * and the translated metadata are arbitrary text.
 */
const processTemplate = (
    templateHtml: string,
    appHtml: string,
    metadata: PageMetadata
) =>
    templateHtml
        .replace(APP_HTML_MARKER, () => appHtml)
        .replace(
            '<title>%%TITLE%%</title>',
            () => `<title>${escapeHtml(metadata.documentTitle)}</title>`
        )
        .replace('<template>%%DESCRIPTION%%</template>', () =>
            metadata.description
                ? `<meta name="description" content="${escapeHtml(metadata.description)}"/>`
                : ''
        )
        .replace('<template>%%CANONICAL%%</template>', () =>
            metadata.canonicalUrl
                ? `<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}"/>`
                : ''
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

    const metadata = getPageMetadata(
        appPathFromPathname(url),
        locale,
        env.VITE_APP_ORIGIN
    );

    try {
        return processTemplate(template, render(url), metadata);
    } catch (e) {
        // Falling back to a shell means the client still renders, but the page
        // loses SSR silently - so log loudly enough to be found.
        console.error(
            `SSR failed for ${url}:\n${e instanceof Error ? e.stack : e}`
        );
        return processTemplate(template, '', metadata);
    }
};
