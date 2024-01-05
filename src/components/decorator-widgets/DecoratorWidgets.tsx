import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStore } from 'providers/Provider';
import { setNewLocale } from 'utils/locale';
import { Locale } from 'common/locale';
import { paths } from 'common/paths';
import {
    onBreadcrumbClick,
    onLanguageSelect,
    setAvailableLanguages,
    setBreadcrumbs,
} from '@navikt/nav-dekoratoren-moduler';
import { getBreadcrumbsFromPathname } from 'common/breadcrumbs';

export const DecoratorWidgets = () => {
    const { pathname } = useLocation();
    const pathnamePrefixed = `${paths.kontaktOss.forside}${pathname}`;
    const navigate = useNavigate();
    const [{ locale }, dispatch] = useStore();

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
        console.log('pathnamePrefixed', pathnamePrefixed);
        const breadcrumbs = getBreadcrumbsFromPathname(
            pathnamePrefixed,
            locale
        );

        setBreadcrumbs([...breadcrumbs]);
    }, [pathnamePrefixed, locale]);

    return null;
};
