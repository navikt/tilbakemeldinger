import { Action } from '#client/providers/Store.ts';
import { appPath, getLocaleFromUrl, parseAppPath } from '#shared/appPath.ts';
import { Locale } from '#shared/locale.ts';

export const setNewLocale = (locale: Locale, dispatch: (action: Action) => void) => {
	const { search, hash, pathname } = window.location;
	const newUrl = appPath(locale, parseAppPath(pathname).page) + search + hash;

	window.history.pushState({}, '', newUrl);
	dispatch({ type: 'SETT_LOCALE', payload: locale });
};

export const setLocaleFromUrl = (dispatch: (action: Action) => void) => {
	dispatch({ type: 'SETT_LOCALE', payload: getLocaleFromUrl(window.location.pathname) });
};
