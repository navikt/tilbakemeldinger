// What a page's <head> holds, besides the decorator's and Vite's tags
export type PageHead = { title: string; description?: string; canonical?: string; noindex?: boolean };

// What client/main-server.tsx's render() returns, for a path. server/site/page.ts writes
// the page from it, with the built bundle and in dev.
export type SsrRender = (path: string) => { html: string; head: PageHead; status: 200 | 404 };
