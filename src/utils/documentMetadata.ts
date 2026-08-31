import type { PageMetadata } from 'common/metadata';

/*
 * Keeps <head> in step with the current page.
 *
 * The initial head is written by the server (server/ssr/htmlRenderer.ts), so
 * this only has real work to do when the app changes page — or locale — without
 * a page load. Applying it on mount too is harmless: every value it writes is
 * the one already there.
 *
 * React 19 can hoist <title>/<meta>/<link> into the head by itself, but it only
 * adopts the server's copies as part of the hydration pass, and renderToString
 * has no head to render them into, so they can never be part of it. Anything
 * rendered after hydration is appended next to the server's copies instead of
 * replacing them. Updating the elements directly avoids that, and matches the
 * fact that the head is shared with nav-dekoratoren rather than owned by React.
 */

const upsert = <E extends HTMLElement>(
    selector: string,
    create: () => E
): E => {
    const existing = document.head.querySelector<E>(selector);

    if (existing) {
        return existing;
    }

    const created = create();
    document.head.appendChild(created);
    return created;
};

const createMeta = (name: string) => () => {
    const meta = document.createElement('meta');
    meta.name = name;
    return meta;
};

const createLink = (rel: string) => () => {
    const link = document.createElement('link');
    link.rel = rel;
    return link;
};

export const applyDocumentMetadata = ({
    documentTitle,
    description,
    canonicalUrl,
}: PageMetadata) => {
    document.title = documentTitle;

    // Absent on pages with no metadata entry, so a stale one from the page
    // before has to go rather than being left to describe the wrong page.
    if (description) {
        upsert('meta[name="description"]', createMeta('description')).content =
            description;
    } else {
        document.head.querySelector('meta[name="description"]')?.remove();
    }

    if (canonicalUrl) {
        upsert('link[rel="canonical"]', createLink('canonical')).href =
            canonicalUrl;
    } else {
        document.head.querySelector('link[rel="canonical"]')?.remove();
    }
};

/**
 * Adds `<meta name="robots" content="noindex">` and returns a function that
 * removes it again — the shape useEffect wants.
 */
export const addNoindex = () => {
    const meta = createMeta('robots')();
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => meta.remove();
};
