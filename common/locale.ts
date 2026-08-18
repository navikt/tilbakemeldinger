import nb from './language/nb.js';
import nn from './language/nn.js';
import en from './language/en.js';

// The array is the single source of truth; the union derives from it, so adding
// a locale is a one-line change.
export const validLocales = ['nb', 'en', 'nn'] as const;
export type Locale = (typeof validLocales)[number];
export const defaultLocale: Locale = 'nb';

export const isLocale = (str: string): str is Locale =>
    (validLocales as readonly string[]).includes(str);

// nb is the reference locale: nn and en are typed against its keys, so a key
// added to or removed from only one language file fails to compile.
export type TranslationKey = keyof typeof nb;

const translations: Record<Locale, Record<TranslationKey, string>> = {
    en,
    nb,
    nn,
};

export function translate(locale: Locale, key: string): string {
    // Keys are also composed at runtime (see getBreadcrumbsFromPathname), hence
    // the plain string parameter and the fallback below.
    const translation: string | undefined =
        translations[locale][key as TranslationKey];

    if (!translation) {
        console.log(
            `No translation found for key: ${key} in locale: ${locale}`
        );
        return key;
    }

    return translation;
}
