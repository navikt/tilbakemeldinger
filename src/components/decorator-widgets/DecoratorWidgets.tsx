import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useStore } from 'providers/Provider';
import { Locale, setNewLocale } from 'utils/locale';
import { forsidePath } from 'Config';
import {
    onBreadcrumbClick,
    onLanguageSelect,
    setAvailableLanguages,
    setBreadcrumbs,
} from '@navikt/nav-dekoratoren-moduler';

const basePathFilter = new RegExp(`${forsidePath}/(nb|nn|en)?`, 'i');

export const DecoratorWidgets = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [{ locale }, dispatch] = useStore();
    const { formatMessage } = useIntl();

    onLanguageSelect((breadcrumb) => {
        setNewLocale(breadcrumb.locale as Locale, dispatch);
    });

    onBreadcrumbClick((breadcrumb) => {
        navigate(breadcrumb.url);
    });

    // Set languages in decorator
    useEffect(() => {
        const subPath = pathname.replace(`${forsidePath}/${locale}`, '');

        setAvailableLanguages([
            {
                locale: 'nb',
                url: `${forsidePath}/nb/${subPath}`,
                handleInApp: true,
            },
            {
                locale: 'nn',
                url: `${forsidePath}/nn/${subPath}`,
                handleInApp: true,
            },
            {
                locale: 'en',
                url: `${forsidePath}/en/${subPath}`,
                handleInApp: true,
            },
        ]);
    }, [pathname, locale]);

    // Set breadcrumbs in decorator
    useEffect(() => {
        const basePath = `${forsidePath}/${locale === 'nn' ? 'nb' : locale}`;
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
                    url: `${forsidePath}/${locale}/${subPath}`,
                    title: formatMessage({ id: `breadcrumb.${pathSegment}` }),
                    handleInApp: true,
                };
            });

        setBreadcrumbs([baseBreadcrumb, ...internalBreadcrumbs]);
    }, [pathname, locale]);

    return null;
};
