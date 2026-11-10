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
		onLanguageSelect((language) => {
			setNewLocale(language.locale as Locale, dispatch);
		});
	}, [dispatch]);

	// Back/forward after a language switch changes the locale without the decorator
	// knowing. After the decorator's own language switch, this changes nothing.
	useEffect(() => {
		void setParams({ language: locale });
	}, [locale]);

	// Set languages in decorator. The page never changes, so neither do they
	useEffect(() => {
		const { page } = parseAppPath(window.location.pathname);

		void setAvailableLanguages(
			languages.map((language) => ({ locale: language, url: appPath(language, page), handleInApp: true }))
		);
	}, []);

	// Set breadcrumbs in decorator
	useEffect(() => {
		const breadcrumbs = getBreadcrumbsFromPathname(window.location.pathname, locale);

		void setBreadcrumbs([...breadcrumbs]);
	}, [locale]);

	return null;
};
