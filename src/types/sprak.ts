export interface Sprak {
  [key: string]: {};
}

export type Locale = "nb" | "en";
export const validLocales: Locale[] = ["nb", "en"];  // :(
export const defaultLocale = "nb" as Locale;

export const isLocale = (str: string): str is Locale => validLocales.includes(str as Locale);
