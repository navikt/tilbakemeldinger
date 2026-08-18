import { DecoratorEnvProps } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { env, isLocalhost } from '../env.js';

const DECORATOR_LOCAL_URL = 'https://www.nav.no/dekoratoren';

export const decoratorEnvProps: DecoratorEnvProps = isLocalhost(env)
    ? { env: env.ENV, localUrl: DECORATOR_LOCAL_URL }
    : { env: env.ENV };
