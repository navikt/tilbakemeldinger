import { paths } from './paths';
import { Locale } from './locale';

import nb from './language/nb';
import nn from './language/nn';
import en from './language/en';

export interface ITranslation {
    [key: string]: string;
}

const translations: Record<Locale, ITranslation> = { en, nb, nn };

//TODO flytt til locale?
export function translate(locale: Locale, key: string): string {
    const translationKeys = translations[locale];
    if (!translationKeys) {
        throw new Error(`No translations found for locale: ${locale}`);
    }

    const translation = translationKeys[key];
    if (!translation) {
        console.warn(
            `No translation found for key: ${key} in locale: ${locale}`
        );
        return key;
    }

    return translation;
}

//TODO any
export const getBreadcrumbsFromPathname: any = (
    url: string,
    locale: string
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
        title: translate(locale as Locale, 'breadcrumb.base'),
        handleInApp: false,
    };

    const internalBreadcrumbs = url
        .replace(basePathFilter, '')
        .split('/')
        .filter((pathSegment) => pathSegment !== '')
        .map((pathSegment, index, pathSegmentArray) => {
            const subPath = pathSegmentArray.slice(0, index + 1).join('/');
            return {
                url: `/${locale}/${subPath}`,
                title: translate(locale as Locale, `breadcrumb.${pathSegment}`),
                handleInApp: true,
            };
        });

    return [baseBreadcrumb, ...internalBreadcrumbs];
};
