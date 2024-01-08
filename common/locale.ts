export type Locale = 'nb' | 'en' | 'nn';
export const validLocales: Locale[] = ['nb', 'en', 'nn']; // :(
export const defaultLocale = 'nb' as Locale;

export const isLocale = (str: string): str is Locale =>
    validLocales.includes(str as Locale);

import nb from './language/nb';
import nn from './language/nn';
import en from './language/en';

export interface ITranslation {
    [key: string]: string;
}

const translations: Record<Locale, ITranslation> = { en, nb, nn };

export function translate(locale: Locale, key: string): string {
    const translationKeys = translations[locale];
    if (!translationKeys) {
        throw new Error(`No translations found for locale: ${locale}`);
    }

    const translation = translationKeys[key];
    if (!translation) {
        console.warn(
            `No translation found for key: ${key} in locale: ${locale}`
        );
        return key;
    }

    return translation;
}
