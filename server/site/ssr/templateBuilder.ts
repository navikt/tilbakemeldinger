import fs from 'fs';
import { injectWithDecorator } from '#server/utils/decorator.ts';
import { injectDecoratorServerSide, type DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import type { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { getBreadcrumbsFromPathname } from '#shared/breadcrumbs.ts';
import { type Locale } from '#shared/locale.ts';
import { getLocaleFromUrl } from '#shared/appPath.ts';

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
	const params = getDecoratorParams(getLocaleFromUrl(url), url);

	return injectDecoratorServerSide({
		...envProps,
		filePath: templatePath,
		params,
	});
};
