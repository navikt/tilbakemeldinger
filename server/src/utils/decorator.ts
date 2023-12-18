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
        //TODO fjern
        {
            url: '/',
            title: 'Min app2',
        },
        {
            url: '/',
            title: 'Min app',
        },
    ],
};

const _injectWithDecorator = (
    params: DecoratorParams,
    templatePath: string,
    retries = 3
): Promise<string | null> =>
    injectDecoratorServerSide({
        ...params,
        ...decoratorEnvProps,
        filePath: templatePath,
    }).catch((e) => {
        if (retries <= 0) {
            console.error(`Failed to fetch decorator - ${e}`);
            return null;
        }

        console.log(
            `Injecting decorator with params: ${JSON.stringify(params)}`
        );

        // Use prod-decorator on localhost if the local decorator wasn't responding
        // Probably means the docker-compose network isn't running
        if (DECORATOR_ENV === 'localhost') {
            console.log(
                'Local decorator did not respond, using prod decorator'
            );
            return injectDecoratorServerSide({
                ...params,
                env: 'prod',
                filePath: templatePath,
            });
        }

        return _injectWithDecorator(params, templatePath, retries - 1);
    });

export const injectWithDecorator = async (
    templatePath: string,
    params: DecoratorParams = paramsDefault
) => _injectWithDecorator(params, templatePath);
