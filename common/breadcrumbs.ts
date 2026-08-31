import { paths } from './paths.js';
import { Locale, hasTranslation, translate } from './locale.js';
import { appPathFromPathname } from './appPath.js';

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

    const segments = appPathFromPathname(pathname)
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
