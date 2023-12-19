import { paths } from '../src/Config';
import { IntlShape } from 'react-intl';
import { Locale } from '../src/utils/locale';

import nb from './language/nb';
import nn from './language/nn';
import en from './language/en';

//TODO denne er duplisert pga import-trøbbel
interface ITranslation {
    [key: string]: string;
}

const translations: Record<Locale, ITranslation> = { en, nb, nn };

function translate(locale: Locale, key: string): string {
    const translationKeys = translations[locale];
    console.log('translationKeys: ', translationKeys);
    if (!translationKeys) {
        throw new Error(`No translations found for locale: ${locale}`);
    }

    const translation = translationKeys[key];
    console.log('translation: ', translation);

    if (!translation) {
        console.warn(
            `No translation found for key: ${key} in locale: ${locale}`
        );
        return key;
    }

    return translation;
}

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

    console.log('LOCALE: ', locale);

    const baseBreadcrumb = {
        url: basePath,
        // title: formatMessage({ id: 'breadcrumb.base' }),
        title: translate(locale as Locale, 'breadcrumb.base'),
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
                // title: formatMessage({ id: `breadcrumb.${pathSegment}` }),
                title: translate(locale as Locale, `breadcrumb.${pathSegment}`),
                handleInApp: true,
            };
        });

    return [baseBreadcrumb, ...internalBreadcrumbs];
};
