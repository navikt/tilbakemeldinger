import { appPath, parseAppPath } from './appPath.ts';
import { type Locale, translate } from './locale.ts';

export const getBreadcrumbsFromPathname = (url: string, locale: Locale) => {
	const baseBreadcrumb = {
		url: appPath(locale === 'nn' ? 'nb' : locale),
		title: translate(locale, 'breadcrumb.base'),
		handleInApp: false,
	};

	const internalBreadcrumbs = parseAppPath(url).segments.map((segment, index, segments) => ({
		url: appPath(locale, segments.slice(0, index + 1).join('/')),
		title: translate(locale, `breadcrumb.${segment}`),
		handleInApp: false,
	}));

	return [baseBreadcrumb, ...internalBreadcrumbs];
};
