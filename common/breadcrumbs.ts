import { paths } from './paths.js';
import { Locale, hasTranslation, translate, validLocales } from './locale.js';

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Anchored, so only a real prefix is stripped, and the locale alternation comes
// from validLocales so adding a locale stays the one-line change it claims to be.
const BASE_PATH_PREFIX = new RegExp(
    `^${escapeRegExp(paths.kontaktOss.forside)}(?:/(?:${validLocales.join('|')}))?`
);

const breadcrumbKey = (segment: string) => `breadcrumb.${segment}`;

export const getBreadcrumbsFromPathname = (
    pathname: string,
    locale: Locale
) => {
    const baseBreadcrumb = {
        // The external Kontakt oss page has no nynorsk version, so nn points at
        // nb here — deliberate since 7be57f2f (issue 442). This crumb is
        // handleInApp: false, so the decorator navigates to the URL itself
        // rather than handing the click back to the app.
        url: `${paths.kontaktOss.forside}/${locale === 'nn' ? 'nb' : locale}`,
        title: translate(locale, 'breadcrumb.base'),
        handleInApp: false,
    };

    const segments = pathname
        .replace(BASE_PATH_PREFIX, '')
        .split('/')
        .filter((segment) => segment !== '');

    // Every path reaches the SSR catch-all, so an untranslated segment is
    // arbitrary user input. Stop the trail instead of rendering it as a title.
    const firstUnknown = segments.findIndex(
        (segment) => !hasTranslation(locale, breadcrumbKey(segment))
    );
    const knownSegments =
        firstUnknown === -1 ? segments : segments.slice(0, firstUnknown);

    const internalBreadcrumbs = knownSegments.map((segment, index) => ({
        url: `${paths.kontaktOss.forside}/${locale}/${knownSegments
            .slice(0, index + 1)
            .join('/')}`,
        title: translate(locale, breadcrumbKey(segment)),
        handleInApp: true,
    }));

    return [baseBreadcrumb, ...internalBreadcrumbs];
};
