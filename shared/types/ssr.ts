// What a page's <head> holds, besides the decorator's and Vite's tags
export type PageHead = { title: string; description?: string; canonical?: string; noindex?: boolean };

import type { AppConfig } from './appConfig.ts';

// client/main-server.tsx's render(): a path, and the config the server hands the app, to what
// server/site/page.ts writes the page from, with the built bundle and in dev.
export type SsrRender = (path: string, config: AppConfig) => { html: string; head: PageHead; status: 200 | 404 };
