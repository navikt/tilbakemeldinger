import path from 'path';
import fs from 'fs';
import { injectWithDecorator } from '../../utils/decorator';
import { injectDecoratorServerSide } from '@navikt/nav-dekoratoren-moduler/ssr';
import {
    DecoratorEnvProps,
    DecoratorParams,
} from '@navikt/nav-dekoratoren-moduler/ssr';

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

const decoratorEnv = 'prod';
const decoratorLocalUrl = process.env.DECORATOR_LOCAL_URL;

const envProps: DecoratorEnvProps =
    // decoratorEnv === 'localhost'
    //     ? {
    //           env: decoratorEnv,
    //           localUrl: 'http://localhost:8100',
    //       }
    //     :
    { env: decoratorEnv };

export const getTemplateWithDecorator = async (locale: any) => {
    // const params = getDecoratorParams(locale, 'testUrl');
    const params: DecoratorParams = {
        // context: 'privatperson',
        language: 'en',
        breadcrumbs: [
            {
                url: `testURL`,
                title: 'testTitle',
            },
            {
                url: '/',
                title: 'testTitle2',
            },
        ],
        availableLanguages: [
            { locale: 'nb', handleInApp: true },
            { locale: 'en', handleInApp: true },
        ],
    };

    return injectDecoratorServerSide({
        env: 'prod',
        filePath: templatePath,
        params,
    });
};
