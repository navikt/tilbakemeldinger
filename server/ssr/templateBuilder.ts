import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
    injectDecoratorServerSide,
    DecoratorParams,
} from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { decoratorEnvProps } from '../utils/decorator.js';
import { getBreadcrumbsFromPathname } from '../../common/breadcrumbs.js';
import { Locale, defaultLocale, isLocale } from '../../common/locale.js';

const thisDir = path.dirname(fileURLToPath(import.meta.url));

// Dev serves the source index.html through Vite; the production bundle sits in
// dist/server and reads the built template next to it in dist/client.
const templatePath = import.meta.env.DEV
    ? path.resolve(process.cwd(), 'index.html')
    : path.resolve(thisDir, '..', 'client', 'index.html');

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

// Single injection path for dev and prod. Previously dev and prod each had their
// own, so they rendered different breadcrumbs and dev ignored the locale.
export const getTemplateWithDecorator = async (
    url: string,
    locale: Locale
): Promise<string> => {
    const decorated = await injectDecoratorServerSide({
        ...decoratorEnvProps,
        filePath: templatePath,
        params: getDecoratorParams(
            isLocale(locale) ? locale : defaultLocale,
            url
        ),
    });

    if (!decorated) {
        console.error('Failed to fetch decorator, using undecorated template');
        return fs.readFileSync(templatePath, { encoding: 'utf-8' });
    }

    return decorated;
};
