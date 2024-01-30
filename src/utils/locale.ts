import { paths } from 'common/paths';
import { Action } from 'providers/Store';
import { Locale, defaultLocale, isLocale } from 'common/locale';

export const localePath = (path: string, locale: Locale) => `/${locale}${path}`;

export const setNewLocale = (
    locale: Locale,
    dispatch: (action: Action) => void
) => {
    const subSegments = window.location.pathname
        .split(paths.kontaktOss.forside)[1]
        .split('/')
        .slice(2)
        .join('/');
    const newUrl = `${paths.kontaktOss.forside}/${locale}/${subSegments}`;

    window.history.pushState({}, '', newUrl);
    dispatch({ type: 'SETT_LOCALE', payload: locale });
};

export const getLocaleFromUrl = (url: string) => {
    const locale = url.split(paths.kontaktOss.forside)[1].split('/')[1];

    return isLocale(locale) ? locale : defaultLocale;
};

export const setLocaleFromUrl = (dispatch: (action: Action) => void) => {
    const localeFromUrl = getLocaleFromUrl(window.location.pathname);

    dispatch({ type: 'SETT_LOCALE', payload: localeFromUrl });
};
