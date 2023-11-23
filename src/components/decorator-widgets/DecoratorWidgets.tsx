import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useStore } from 'providers/Provider';
import { Locale, setNewLocale } from 'utils/locale';
import { paths } from 'Config';
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
    const navigate = useNavigate();
    const [{ locale }, dispatch] = useStore();
    const { formatMessage } = useIntl();

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
        const subPath = pathname.replace(
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
    }, [pathname, locale]);

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

        const internalBreadcrumbs = pathname
            .replace(basePathFilter, '')
            .split('/')
            .filter((pathSegment) => pathSegment !== '')
            .map((pathSegment, index, pathSegmentArray) => {
                const subPath = pathSegmentArray.slice(0, index + 1).join('/');
                return {
                    url: `${paths.kontaktOss.forside}/${locale}/${subPath}`,
                    title: formatMessage({ id: `breadcrumb.${pathSegment}` }),
                    handleInApp: true,
                };
            });

        setBreadcrumbs([baseBreadcrumb, ...internalBreadcrumbs]);
    }, [pathname, locale]);

    return null;
};
