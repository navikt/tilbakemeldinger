import { useEffect } from 'react';
import { useStore } from 'providers/Provider';
import { logPageview } from 'src/utils/analytics';
import { applyDocumentMetadata } from 'src/utils/documentMetadata';
import { getPageMetadata } from 'common/metadata';
import { env } from 'src/env';

type Props = {
    /** Route-relative path, as written in common/paths. */
    path: string;
};

/**
 * Renders nothing. The server writes this page's <head> from the same metadata
 * (see server/ssr/htmlRenderer.ts); this only keeps it current as the app moves
 * between pages and locales without a page load.
 */
export const MetaTags = ({ path }: Props) => {
    const [{ locale }] = useStore();

    const { title, documentTitle, description, canonicalUrl } = getPageMetadata(
        path,
        locale,
        env.VITE_APP_ORIGIN
    );

    useEffect(() => {
        applyDocumentMetadata({
            title,
            documentTitle,
            description,
            canonicalUrl,
        });
    }, [title, documentTitle, description, canonicalUrl]);

    useEffect(() => {
        logPageview(title);
    }, [title]);

    return null;
};
