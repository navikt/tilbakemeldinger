import path from 'path';
import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator';
import {
    injectDecoratorServerSide,
    DecoratorEnvProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';
// import { getDecoratorParams } from '../../../../common/decoratorParams';

import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
// import { AppLocale } from './localization/types';
// import { localeString } from './localization/localeString';

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

export const getDecoratorParams = (
    locale: 'en' | 'nb' | 'nn',
    kontaktOssUrl: string
): DecoratorParams => ({
    context: 'privatperson',
    language: locale,
    breadcrumbs: [
        {
            url: `${kontaktOssUrl}/${locale}`,
            title: "localeString('breadcrumb1', locale) as string",
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

export const getTemplateWithDecorator = async (locale: 'nb' | 'nn' | 'en') => {
    const params = getDecoratorParams(
        locale,
        `${process.env.VITE_APP_ORIGIN}/person/kontakt-oss`
    );

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params,
    });
};
