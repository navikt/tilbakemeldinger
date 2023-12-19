import { paths } from 'src/Config';
import { IntlShape } from 'react-intl';

export const getBreadcrumbsFromPathname: any = (
    pathnamePrefixed: string,
    locale: string,
    formatMessage: IntlShape['formatMessage']
) => {
    const basePathFilter = new RegExp(
        `${paths.kontaktOss.forside}/(nb|nn|en)?`,
        'i'
    );

    const basePath = `${paths.kontaktOss.forside}/${
        locale === 'nn' ? 'nb' : locale
    }`;

    const baseBreadcrumb = {
        url: basePath,
        title: formatMessage({ id: 'breadcrumb.base' }),
        handleInApp: false,
    };

    const internalBreadcrumbs = pathnamePrefixed
        .replace(basePathFilter, '')
        .split('/')
        .filter((pathSegment) => pathSegment !== '')
        .map((pathSegment, index, pathSegmentArray) => {
            const subPath = pathSegmentArray.slice(0, index + 1).join('/');
            return {
                url: `/${locale}/${subPath}`,
                title: formatMessage({ id: `breadcrumb.${pathSegment}` }),
                handleInApp: true,
            };
        });

    return [baseBreadcrumb, ...internalBreadcrumbs];
};
