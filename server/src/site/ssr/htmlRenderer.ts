import { buildHtmlTemplate, getTemplateWithDecorator } from './templateBuilder';
import { ViteDevServer } from 'vite';
import { render } from '../../_ssr-dist/main-server';
import { HelmetServerState } from 'react-helmet-async';

export type HtmlRenderer = (url: string) => Promise<string>;

const processTemplate = async (
    templateHtml: string,
    appHtml: string,
    helmet?: HelmetServerState
) => {
    return templateHtml
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
};

export const prodRender: HtmlRenderer = async (url) => {
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

export const devRender =
    (vite: ViteDevServer): HtmlRenderer =>
    async (url) => {
        const template = await buildHtmlTemplate();
        const html = await vite.transformIndexHtml(url, template);

        try {
            const { render } = await vite.ssrLoadModule('/src/main-server.tsx');
            const { appHtml, helmet } = render(url);
            return processTemplate(html, appHtml, helmet);
        } catch (e) {
            const error = e instanceof Error ? e : new Error(String(e));
            vite.ssrFixStacktrace(error);
            console.error(`Dev render error: ${error} \n ${error.stack}`);
            return processTemplate(html, devErrorHtml(error));
        }
    };
