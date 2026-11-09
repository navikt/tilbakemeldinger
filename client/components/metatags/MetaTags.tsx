import { useEffect } from 'react';
import { useStore } from '#client/providers/Provider.tsx';
import { logPageview } from '#client/utils/analytics.ts';
import { type Page, pageHead } from '#client/pages/pages.ts';
import { translate } from '#shared/locale.ts';

// The server writes the page's <head> (client/main-server.tsx). A language switch changes the
// locale in the browser, and the title, description and canonical follow it here.
export const MetaTags = ({ page }: { page: Page }) => {
	const [{ locale }] = useStore();
	const { title, description, canonical } = pageHead(page, locale);
	const pageTitle = translate(locale, page.titleId);

	useEffect(() => {
		logPageview(pageTitle);
	}, [pageTitle]);

	useEffect(() => {
		document.title = title;
		document.head.querySelector('meta[name="description"]')?.setAttribute('content', description);
		document.head.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
	}, [title, description, canonical]);

	return null;
};
