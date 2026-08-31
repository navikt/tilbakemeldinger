import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { AppRoot } from './index';
import { env } from './env';

/*
 * Renders the app body only. Document metadata is not part of this output:
 * renderToString has no <head> to hoist <title>/<meta>/<link> into, so anything
 * the tree emitted would land inside <main>. The server writes the head from
 * common/metadata.ts instead — see server/ssr/htmlRenderer.ts.
 */
export const render = (url: string) =>
    renderToString(
        <StaticRouter basename={env.VITE_APP_BASEPATH} location={url}>
            <AppRoot url={url} />
        </StaticRouter>
    );
