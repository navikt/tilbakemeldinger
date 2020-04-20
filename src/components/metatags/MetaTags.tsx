import React from "react";
import ReactMetaTags from "react-meta-tags";
import { localePath } from "../../utils/locale";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import Environment from "../../Environments";

type Props = {
  titleId?: string;
  descriptionId?: string;
  path?: string;
  children?: JSX.Element;
};

export const MetaTags = ({ path, titleId, descriptionId, children }: Props) => {
  const intl = useIntl();
  const [{ locale }] = useStore();
  const baseUrl = Environment().baseUrl;

  return (
    <ReactMetaTags>
      {titleId && (
        <title>
          {intl.formatMessage({ id: titleId })}
        </title>
      )}
      {descriptionId && (
        <meta
          name="description"
          content={intl.formatMessage({ id: descriptionId })}
        />
      )}
      {path && (
        <>
          <link rel="canonical" href={`${baseUrl}${localePath(path, locale)}`} />
          <link rel="alternate" href={`${baseUrl}${localePath(path, "nb")}`} hrefLang="nb" />
          <link rel="alternate" href={`${baseUrl}${localePath(path, "en")}`} hrefLang="en" />
          <link rel="alternate" href={`${baseUrl}${localePath(path, "en")}`} hrefLang="x-default" />
        </>
      )}
      {children}
    </ReactMetaTags>
  );
};
