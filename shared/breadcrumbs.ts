import { appPath, parseAppPath } from './appPath.ts';
import { type Locale, translate } from './locale.ts';
import { paths } from './paths.ts';

// The decorator library caches its HTML per set of breadcrumbs, with no limit. So only the forms
// get their own, and a made-up path can't add another
const forms = [
	paths.tilbakemeldinger.serviceklage.form,
	paths.tilbakemeldinger.feilogmangler,
	paths.tilbakemeldinger.rostilnav,
];

export const getBreadcrumbsFromPathname = (url: string, locale: Locale) => {
	const baseBreadcrumb = {
		url: appPath(locale === 'nn' ? 'nb' : locale),
		title: translate(locale, 'breadcrumb.base'),
		handleInApp: false,
	};

	const { page, segments } = parseAppPath(url);
	if (!forms.includes(page)) {
		return [baseBreadcrumb];
	}

	const internalBreadcrumbs = segments.map((segment, index) => ({
		url: appPath(locale, segments.slice(0, index + 1).join('/')),
		title: translate(locale, `breadcrumb.${segment}`),
		handleInApp: false,
	}));

	return [baseBreadcrumb, ...internalBreadcrumbs];
};
