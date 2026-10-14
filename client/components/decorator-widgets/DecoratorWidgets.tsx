import { useEffect } from 'react';
import { useStore } from '#client/providers/Provider.tsx';
import { setNewLocale } from '#client/utils/locale.ts';
import { Locale } from '#shared/locale.ts';
import { appPath, parseAppPath } from '#shared/appPath.ts';
import { onLanguageSelect, setAvailableLanguages, setBreadcrumbs, setParams } from '@navikt/nav-dekoratoren-moduler';
import { getBreadcrumbsFromPathname } from '#shared/breadcrumbs.ts';

const languages: Locale[] = ['nb', 'nn', 'en'];

export const DecoratorWidgets = () => {
	const [{ locale }, dispatch] = useStore();

	useEffect(() => {
		onLanguageSelect((breadcrumb) => {
			setNewLocale(breadcrumb.locale as Locale, dispatch);
		});
	}, []);

	// Back/forward after a language switch changes the locale without the decorator
	// knowing. After the decorator's own language switch, this changes nothing.
	useEffect(() => {
		setParams({ language: locale });
	}, [locale]);

	// Set languages in decorator
	useEffect(() => {
		const { page } = parseAppPath(window.location.pathname);

		setAvailableLanguages(languages.map((locale) => ({ locale, url: appPath(locale, page), handleInApp: true })));
	}, [locale]);

	// Set breadcrumbs in decorator
	useEffect(() => {
		const breadcrumbs = getBreadcrumbsFromPathname(window.location.pathname, locale);

		setBreadcrumbs([...breadcrumbs]);
	}, [locale]);

	return null;
};
