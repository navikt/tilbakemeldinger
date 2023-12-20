import { paths } from 'common/Config';
import { Action } from 'providers/Store';
import { Locale } from 'common/locale';

export const validLocales: Locale[] = ['nb', 'en', 'nn']; // :(
export const defaultLocale = 'nb' as Locale;

export const localePath = (path: string, locale: Locale) => `/${locale}${path}`;

const isLocale = (str: string): str is Locale =>
    validLocales.includes(str as Locale);

export const setNewLocale = (
    locale: Locale,
    dispatch: (action: Action) => void
) => {
    // TODO: bruk regex?
    const subSegments = window.location.pathname
        .split(paths.kontaktOss.forside)[1]
        .split('/')
        .slice(2)
        .join('/');
    const newUrl = `${paths.kontaktOss.forside}/${locale}/${subSegments}`;

    window.history.pushState({}, '', newUrl);
    dispatch({ type: 'SETT_LOCALE', payload: locale });
};

export const getLocaleFromUrl = () => {
    if (typeof window === 'undefined') {
        return defaultLocale;
    }

    const locale = window.location.pathname
        .split(paths.kontaktOss.forside)[1]
        .split('/')[1];

    return isLocale(locale) ? locale : defaultLocale;
};

export const setLocaleFromUrl = (dispatch: (action: Action) => void) => {
    const localeFromUrl = getLocaleFromUrl();

    dispatch({ type: 'SETT_LOCALE', payload: localeFromUrl });
};
