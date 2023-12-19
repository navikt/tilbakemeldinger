import path from 'path';
import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator';
import {
    injectDecoratorServerSide,
    DecoratorEnvProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';

import { DecoratorParams } from '@navikt/nav-dekoratoren-moduler';
import nb from '../../../../common/language/nb';
import nn from '../../../../common/language/nn';
import en from '../../../../common/language/en';

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

// Define a mapping type that TypeScript can understand
type LanguageMap = {
    [key in Locale]: typeof nb | typeof nn | typeof en;
};

// Populate the map with your language objects
const languageMap: LanguageMap = {
    nb: nb,
    nn: nn,
    en: en,
};

//TODO useIntl her?

const getDecoratorParams = (locale: Locale, url: string): DecoratorParams => ({
    context: 'privatperson',
    language: locale,
    breadcrumbs: [
        {
            url: `${process.env.VITE_APP_ORIGIN}/person/kontakt-oss/${locale}`,
            title: en['breadcrumb.base'],
            // title: languageMap['en']['breadcrumb.base'],
            // title: languageMap[locale]['breadcrumb.base'],
        },
        {
            url: `${process.env.VITE_APP_ORIGIN}/person/kontakt-oss/${locale}/tilbakemeldinger`,
            title: 'Tilbakemelding',
        },
        ...(url.split('/').length > 5
            ? [
                  {
                      url: '/',
                      title: 'Ros',
                  },
              ]
            : []),
    ],
    availableLanguages: [
        { locale: 'nb', handleInApp: true },
        { locale: 'nn', handleInApp: true },
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

    console.log('URL LENGTH: ', url.split('/').length);

    const params = getDecoratorParams(locale, url);

    return injectDecoratorServerSide({
        ...envProps,
        filePath: templatePath,
        params,
    });
};
