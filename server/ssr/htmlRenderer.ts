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

export const renderPage: HtmlRenderer = async (url, locale) => {
    const template = await getTemplateWithDecorator(url, locale);

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
