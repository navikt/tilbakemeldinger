import path from 'path';
import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator';
import {
    injectDecoratorServerSide,
    DecoratorEnvProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';
import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import { getBreadcrumbsFromPathname } from '../../../../common/breadcrumbs';
import { Locale, defaultLocale, isLocale } from '../../../../common/locale';

const templatePath =
    process.env.NODE_ENV === 'development'
        ? path.resolve(process.cwd(), '..', 'index.html')
        : path.resolve(process.cwd(), 'server', 'dist', 'client', 'index.html');

const getUndecoratedTemplate = () =>
    fs.readFileSync(templatePath, { encoding: 'utf-8' });

export const buildHtmlTemplate = async () => {
    const templateWithDecorator = await injectWithDecorator(templatePath);

    if (!templateWithDecorator) {
        console.error(`Failed to fetch decorator, using undecorated template`);
        return getUndecoratedTemplate();
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

export const getTemplateWithDecorator = async (url: string) => {
    const locale = url.split('/')[3] as Locale;

    const params = getDecoratorParams(
        isLocale(locale) ? locale : defaultLocale,
        url
    );

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params,
    });
};
