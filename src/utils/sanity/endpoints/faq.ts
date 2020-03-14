import { LocaleLink, LocaleString } from "../serializers";

export type FAQ = {
  lenke: LocaleLink,
  tittel: LocaleString,
  priority: number
};
