import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator.ts';
import { injectDecoratorServerSide, type DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import type { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { getBreadcrumbsFromPathname } from '#common/breadcrumbs.ts';
import { type Locale, defaultLocale, isLocale } from '#common/locale.ts';

export const buildHtmlTemplate = async (templatePath: string) => {
	const templateWithDecorator = await injectWithDecorator(templatePath);

	if (!templateWithDecorator) {
		console.error(`Failed to fetch decorator, using undecorated template`);
		return fs.readFileSync(templatePath, { encoding: 'utf-8' });
	}

	return templateWithDecorator;
};

const getDecoratorParams = (locale: Locale, url: string): DecoratorParams => ({
	context: 'privatperson',
	language: locale,
	breadcrumbs: [...getBreadcrumbsFromPathname(url, locale)],
	availableLanguages: [
		{ locale: 'nb', handleInApp: true },
		{ locale: 'nn', handleInApp: true },
		{ locale: 'en', handleInApp: true },
	],
});

const decoratorEnv = 'prod';
const envProps: DecoratorEnvProps = { env: decoratorEnv };

export const getTemplateWithDecorator = async (url: string, templatePath: string) => {
	const locale = url.split('/')[3] as Locale;

	const params = getDecoratorParams(isLocale(locale) ? locale : defaultLocale, url);

	return injectDecoratorServerSide({
		...envProps,
		filePath: templatePath,
		params,
	});
};
