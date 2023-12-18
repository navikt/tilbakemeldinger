import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useStore } from 'providers/Provider';
import { Locale, setNewLocale } from 'utils/locale';
import { paths } from 'src/Config';
import {
    onBreadcrumbClick,
    onLanguageSelect,
    setAvailableLanguages,
    setBreadcrumbs,
} from '@navikt/nav-dekoratoren-moduler';

const basePathFilter = new RegExp(
    `${paths.kontaktOss.forside}/(nb|nn|en)?`,
    'i'
);

export const DecoratorWidgets = () => {
    const { pathname } = useLocation();
    const pathnamePrefixed = `${paths.kontaktOss.forside}${pathname}`;
    const navigate = useNavigate();
    const [{ locale }, dispatch] = useStore();
    const { formatMessage } = useIntl();

    console.log('DecoratorWidgets');

    useEffect(() => {
        onLanguageSelect((breadcrumb) => {
            setNewLocale(breadcrumb.locale as Locale, dispatch);
        });

        onBreadcrumbClick((breadcrumb) => {
            navigate(breadcrumb.url);
        });
    }, []);

    // Set languages in decorator
    useEffect(() => {
        const subPath = pathnamePrefixed.replace(
            `${paths.kontaktOss.forside}/${locale}`,
            ''
        );

        setAvailableLanguages([
            {
                locale: 'nb',
                url: `${paths.kontaktOss.forside}/nb/${subPath}`,
                handleInApp: true,
            },
            {
                locale: 'nn',
                url: `${paths.kontaktOss.forside}/nn/${subPath}`,
                handleInApp: true,
            },
            {
                locale: 'en',
                url: `${paths.kontaktOss.forside}/en/${subPath}`,
                handleInApp: true,
            },
        ]);
    }, [pathnamePrefixed, locale]);

    // Set breadcrumbs in decorator
    useEffect(() => {
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

        setBreadcrumbs([baseBreadcrumb, ...internalBreadcrumbs]);
    }, [pathnamePrefixed, locale]);

    return null;
};
