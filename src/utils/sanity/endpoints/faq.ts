import { LocaleLink, LocaleString } from "../serializers";

export type FAQLenke = {
  lenke: LocaleLink;
  tittel: LocaleString;
  priority: number;
}

export type FAQ = {
  isLoaded: boolean;
  faqLenker: FAQLenke[];
};
