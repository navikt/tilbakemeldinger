import { cleanDoubleSlashes, joinURL, parseURL, withoutBase } from 'ufo';
import { paths } from './paths.ts';
import { type Locale, defaultLocale, isLocale } from './locale.ts';

// /person/kontakt-oss/<locale>/<page...> -> the locale (if the URL has a valid one) and the page after it.
// Ignores case, the query, the hash and extra or trailing slashes.
export const parseAppPath = (url: string) => {
	const { pathname } = parseURL(cleanDoubleSlashes(url.toLowerCase()));
	const [first, ...rest] = withoutBase(pathname, paths.kontaktOss.forside).split('/').filter(Boolean);
	const locale = isLocale(first) ? first : undefined;
	const segments = locale ? rest : first === undefined ? [] : [first, ...rest];

	return { locale, segments, page: `/${segments.join('/')}` };
};

export const getLocaleFromUrl = (url: string): Locale => parseAppPath(url).locale ?? defaultLocale;

// The full path to a page in the app: /person/kontakt-oss/<locale><page>
export const appPath = (locale: Locale, page = '') => joinURL(paths.kontaktOss.forside, locale, page);
