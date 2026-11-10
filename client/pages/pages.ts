import type { ComponentType } from 'react';
import { joinURL } from 'ufo';
import Environment from '#client/Environments.ts';
import ServiceKlage from '#client/pages/tilbakemeldinger/service-klage/ServiceKlage.tsx';
import FeilOgMangler from '#client/pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler.tsx';
import Ros from '#client/pages/tilbakemeldinger/ros-til-nav/Ros.tsx';
import { appPath, parseAppPath } from '#shared/appPath.ts';
import { type Locale, translate } from '#shared/locale.ts';
import { paths } from '#shared/paths.ts';
import type { PageHead } from '#shared/types/ssr.ts';

export type Page = {
	path: string;
	component: ComponentType;
	titleId: string;
	descriptionId: string;
};

const pages: Page[] = [
	{
		path: paths.tilbakemeldinger.serviceklage.form,
		component: ServiceKlage,
		titleId: 'tilbakemeldinger.serviceklage.sidetittel',
		descriptionId: 'seo.serviceklage.description',
	},
	{
		path: paths.tilbakemeldinger.feilogmangler,
		component: FeilOgMangler,
		titleId: 'tilbakemeldinger.feil-og-mangler.sidetittel',
		descriptionId: 'seo.feil-og-mangler.description',
	},
	{
		path: paths.tilbakemeldinger.rostilnav,
		component: Ros,
		titleId: 'tilbakemeldinger.ros-til-nav.sidetittel',
		descriptionId: 'seo.ros-til-nav.description',
	},
];

// The page at a URL. Undefined for a URL without a locale or an unknown page, which get the 404 page
export const findPage = (url: string) => {
	const { locale, page } = parseAppPath(url);
	return locale ? pages.find(({ path }) => path === page) : undefined;
};

// The page's <head>: the server writes it, and the browser updates it on a language switch
export const pageHead = (page: Page, locale: Locale) => ({
	title: `${translate(locale, page.titleId)} - www.nav.no`,
	description: translate(locale, page.descriptionId),
	canonical: joinURL(Environment().baseUrl, appPath(locale, page.path)),
});

export const notFoundHead = (locale: Locale): PageHead => ({
	title: `${translate(locale, 'feil.404')} - www.nav.no`,
	noindex: true,
});
