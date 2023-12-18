import path from 'path';
import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator';
import {
    injectDecoratorServerSide,
    DecoratorEnvProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';

import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';

//TODO import fra utils
type Locale = 'nb' | 'en' | 'nn';

const templatePath =
    process.env.NODE_ENV === 'development'
        ? path.resolve(process.cwd(), '..', 'index.html')
        : path.resolve(process.cwd(), 'dist', 'client', 'index.html');

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

const getDecoratorParams = (locale: Locale): DecoratorParams => ({
    context: 'privatperson',
    language: locale,
    breadcrumbs: [
        {
            url: `${process.env.VITE_APP_ORIGIN}/person/kontakt-oss/${locale}`,
            title: 'Kontakt oss', //TODO bruk breadcrumb.base,
        },
        {
            url: '/',
            title: "localeString('breadcrumb2', locale) as string",
        },
    ],
    availableLanguages: [
        { locale: 'nb', handleInApp: true },
        { locale: 'en', handleInApp: true },
    ],
});

const decoratorEnv = 'prod';
// const decoratorEnv = process.env.ENV || 'prod';
const decoratorLocalUrl = process.env.DECORATOR_LOCAL_URL;

const envProps: DecoratorEnvProps =
    // decoratorEnv === 'localhost'
    //     ? {
    //           env: decoratorEnv,
    //           localUrl: decoratorLocalUrl,
    //       }
    //     :
    { env: decoratorEnv };

export const getTemplateWithDecorator = async (url: string) => {
    const locale = url.split('/')[3] as Locale; //TODO sjekk om locale alltid hentes fra url
    console.log(`Locale: ${locale}`);

    const params = getDecoratorParams(locale);

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params,
    });
};
