import { DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

const DECORATOR_ENV = process.env.ENV;
const DECORATOR_LOCAL_URL = 'https://www.nav.no/dekoratoren';

export const decoratorEnvProps: DecoratorEnvProps =
    DECORATOR_ENV === 'localhost'
        ? { env: DECORATOR_ENV, localUrl: DECORATOR_LOCAL_URL }
        : { env: DECORATOR_ENV };
