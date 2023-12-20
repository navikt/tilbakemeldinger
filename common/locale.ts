export type Locale = 'nb' | 'en' | 'nn';
export const validLocales: Locale[] = ['nb', 'en', 'nn']; // :(
export const defaultLocale = 'nb' as Locale;

export const isLocale = (str: string): str is Locale =>
    validLocales.includes(str as Locale);
