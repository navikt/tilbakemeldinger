import { paths } from './paths';
import { Locale, translate } from './locale';

export const getBreadcrumbsFromPathname = (url: string, locale: Locale) => {
    const basePathFilter = new RegExp(
        `${paths.kontaktOss.forside}/(nb|nn|en)?`,
        'i'
    );

    const basePath = `${paths.kontaktOss.forside}/${
        locale === 'nn' ? 'nb' : locale
    }`;

    const baseBreadcrumb = {
        url: basePath,
        title: translate(locale, 'breadcrumb.base'),
        handleInApp: false,
    };

    const internalBreadcrumbs = url
        .replace(basePathFilter, '')
        .split('/')
        .filter((pathSegment) => pathSegment !== '')
        .map((pathSegment, index, pathSegmentArray) => {
            const subPath = pathSegmentArray.slice(0, index + 1).join('/');
            return {
                url: `${paths.kontaktOss.forside}/${locale}/${subPath}`,
                title: translate(locale, `breadcrumb.${pathSegment}`),
                handleInApp: true,
            };
        });

    return [baseBreadcrumb, ...internalBreadcrumbs];
};
