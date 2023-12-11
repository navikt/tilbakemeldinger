import { buildHtmlTemplate } from './templateBuilder';
import { ViteDevServer } from 'vite';
// @ts-ignore (this file is generated by vite build)
import { render } from '../../_ssr-dist/main-server';

export type HtmlRenderer = (url: string) => Promise<string>;

const processTemplate = async (templateHtml: string, appHtml: string) => {
    return templateHtml.replace('<!--ssr-app-html-->', appHtml);
};

export const prodRender: HtmlRenderer = async (url) => {
    try {
        const template = await buildHtmlTemplate();
        const appHtml = render(url, {});
        return processTemplate(template, appHtml);
    } catch (e) {
        //TODO legg til noe mer?
        console.error(`Rendering failed ${e}`);
        return '';
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
            const appHtml = render(url);
            return processTemplate(html, appHtml);
        } catch (e: any) {
            vite.ssrFixStacktrace(e);
            console.error(`Dev render error: ${e} \n ${e.stack}`);
            return processTemplate(html, devErrorHtml(e));
        }
    };
