import { LocaleLink, LocaleString } from "../common-types";

export type FAQLenke = {
  lenke: LocaleLink;
  tittel: LocaleString;
  priority: number;
};

export type FAQ = {
  isLoaded: boolean;
  faqLenker: FAQLenke[];
};

export const initialFAQ = {
  isLoaded: false,
  faqLenker: []
};
