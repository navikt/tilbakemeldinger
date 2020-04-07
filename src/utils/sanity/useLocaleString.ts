import { defaultLocale, Locale } from "../../types/sprak";
import { useStore } from "../../providers/Provider";

export const useLocaleString = () => {
  const [{ locale }] = useStore();

  return (text: { [key in Locale]: string } | undefined) => (text && (text[locale] || text[defaultLocale])) || "";
};
