import type { HelmetServerState } from 'react-helmet-async';

// What client/main-server.tsx's render() returns. server/site/ssr/htmlRenderer.ts
// fills the HTML template from it, both from the built bundle and in dev.
export type SsrRender = (url: string) => { html: string; helmet?: HelmetServerState };
