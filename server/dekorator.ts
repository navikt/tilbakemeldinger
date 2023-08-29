const {
    injectDecoratorServerSide,
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('@navikt/nav-dekoratoren-moduler/ssr');

const getHtmlWithDecorator = (
    filePath: string,
    devOrProd: string,
    language: string
) => {
    const isDev = devOrProd === 'dev';
    const basePath = isDev ? `https://www.intern.dev.nav.no` : `https://www.nav.no`;
    return injectDecoratorServerSide({
        filePath: filePath,
        env: devOrProd,
        language: language,
        breadcrumbs: [
            {
                url: `${basePath}/person/kontakt-oss/${
                    language === 'nn' ? 'nb' : language
                }`,
                title: language === 'nb' ? 'Kontakt oss' : 'Contact us',
                handleInApp: true,
            },
        ],
        availableLanguages: [
            { locale: 'nb', url: `${basePath}/person/kontakt-oss/nb/` },
            { locale: 'nn', url: `${basePath}/person/kontakt-oss/nn/` },
            { locale: 'en', url: `${basePath}/person/kontakt-oss/en/` },
        ],
        logoutWarning: true,
    });
};

module.exports = getHtmlWithDecorator;
