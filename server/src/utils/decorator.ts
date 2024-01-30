import {
    injectDecoratorServerSide,
    DecoratorParams,
    DecoratorEnvProps,
} from '@navikt/nav-dekoratoren-moduler/ssr';

const DECORATOR_ENV = process.env.ENV;
const DECORATOR_LOCAL_URL = 'https://www.nav.no/dekoratoren';

export const decoratorEnvProps: DecoratorEnvProps =
    DECORATOR_ENV === 'localhost'
        ? {
              env: DECORATOR_ENV,
              localUrl: DECORATOR_LOCAL_URL,
          }
        : { env: DECORATOR_ENV };

const paramsDefault: DecoratorParams = {
    breadcrumbs: [
        {
            url: '/',
            title: 'Tilbakemelding',
        },
    ],
};

const _injectWithDecorator = (
    params: DecoratorParams,
    templatePath: string
): Promise<string | null> =>
    injectDecoratorServerSide({
        ...params,
        ...decoratorEnvProps,
        filePath: templatePath,
    });

export const injectWithDecorator = async (
    templatePath: string,
    params: DecoratorParams = paramsDefault
) => _injectWithDecorator(params, templatePath);
