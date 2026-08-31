import { paths } from './paths.js';
import { Locale, TranslationKey, translate } from './locale.js';

/*
 * Page metadata lives here rather than in the page components because the
 * server needs it too.
 *
 * <title>, the description and the canonical link belong in <head>, and the
 * React tree is rendered into <main> — renderToString has no head to hoist
 * into, so anything the tree emits stays in the body. The server therefore
 * writes the head itself, from this map, while the client reads the same map to
 * keep the document in sync across in-app navigation. One source, so the head a
 * crawler sees and the head a user ends up with cannot drift apart.
 */

type MetadataKeys = {
    titleId: TranslationKey;
    descriptionId: TranslationKey;
};

// Keyed by the route-relative path (see common/appPath.ts), which is also what
// the route table and MetaTags use.
const PAGE_METADATA: Partial<Record<string, MetadataKeys>> = {
    [paths.tilbakemeldinger.forside]: {
        titleId: 'tilbakemeldinger.tilbakemeldinger.sidetittel',
        descriptionId: 'seo.tilbakemeldinger.description',
    },
    [paths.tilbakemeldinger.serviceklage.form]: {
        titleId: 'tilbakemeldinger.serviceklage.sidetittel',
        descriptionId: 'seo.serviceklage.description',
    },
    [paths.tilbakemeldinger.feilogmangler]: {
        titleId: 'tilbakemeldinger.feil-og-mangler.sidetittel',
        descriptionId: 'seo.feil-og-mangler.description',
    },
    [paths.tilbakemeldinger.rostilnav]: {
        titleId: 'tilbakemeldinger.ros-til-nav.sidetittel',
        descriptionId: 'seo.ros-til-nav.description',
    },
};

const TITLE_SUFFIX = ' - www.nav.no';

// Every path reaches the SSR catch-all, so most requests are for something not
// in the map above. They still need a <title>, and the app is a single service
// with one name, so the front page title doubles as the generic one.
const FALLBACK_TITLE_ID: TranslationKey =
    'tilbakemeldinger.tilbakemeldinger.sidetittel';

export type PageMetadata = {
    /** The page name on its own — what analytics records. */
    title: string;
    /** The page name with the site suffix — what goes in <title>. */
    documentTitle: string;
    /** Absent for paths with no entry in the map. */
    description?: string;
    /** Absent for paths with no entry in the map. */
    canonicalUrl?: string;
};

export const fallbackMetadata = (locale: Locale): PageMetadata => {
    const title = translate(locale, FALLBACK_TITLE_ID);
    return { title, documentTitle: `${title}${TITLE_SUFFIX}` };
};

export const getPageMetadata = (
    appPath: string,
    locale: Locale,
    origin: string
): PageMetadata => {
    const keys = PAGE_METADATA[appPath];

    if (!keys) {
        return fallbackMetadata(locale);
    }

    const title = translate(locale, keys.titleId);

    return {
        title,
        documentTitle: `${title}${TITLE_SUFFIX}`,
        description: translate(locale, keys.descriptionId),
        canonicalUrl: `${origin}${paths.kontaktOss.forside}/${locale}${appPath}`,
    };
};
