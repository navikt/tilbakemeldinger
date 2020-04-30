import React from "react";
import { LocaleString, LocaleUrl } from "../../utils/sanity/common-types";
import { useLocaleString } from "../../utils/sanity/useLocaleString";
import { useIntl } from "react-intl";
import RouterLenkeMedChevron from "../routerlenke/RouterLenkeMedChevron";
import RouterLenke from "../routerlenke/RouterLenke";
import { useStore } from "../../providers/Provider";
import { defaultLocale } from "../../utils/locale";

type Props = {
  localeUrl: LocaleUrl;
  sanityText?: LocaleString;
  intlTextId?: string;
  chevron?: boolean;
  onClick?: () => void;
  className?: string;
};

export const LocaleLenke = (props: Props) => {
  const [{ locale }] = useStore();
  const { formatMessage } = useIntl();
  const localeString = useLocaleString();
  const { localeUrl, sanityText, intlTextId = "MISSING_TEXT", chevron = true } = props;

  const currentLocaleUrl = localeUrl[locale];
  const url = currentLocaleUrl || localeUrl[defaultLocale];
  if (!url) {
    console.error("Invalid url");
    return null;
  }

  const linkText = `${sanityText ? localeString(sanityText) : formatMessage({ id: intlTextId })}${!currentLocaleUrl ? formatMessage({ id: "sprak.lenke.norsk" }) : ""}`;
  const LinkComponent = chevron ? RouterLenkeMedChevron : RouterLenke;

  return (
    <LinkComponent
      href={url}
      isExternal={true}
      onClick={props.onClick}
      className={props.className}
    >
      {linkText}
    </LinkComponent>
  );
};
