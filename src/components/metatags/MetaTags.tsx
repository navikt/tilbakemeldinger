import React, { useEffect } from "react";
import { localePath } from "../../utils/locale";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import Environment from "../../Environments";
import { logPageview } from "../../utils/amplitude";
import { Helmet } from "react-helmet-async";

type Props = {
  path: string;
  titleId: string;
  descriptionId?: string;
  children?: JSX.Element;
};

export const MetaTags = ({ path, titleId, descriptionId, children }: Props) => {
  const intl = useIntl();
  const [{ locale }] = useStore();
  const baseUrl = Environment().baseUrl;
  const title = intl.formatMessage({ id: titleId });

  useEffect(() => {
    logPageview(title);
  }, [title]);

  return (
    <Helmet>
      {titleId && <title>{`${title} - www.nav.no`}</title>}
      {descriptionId && (
        <meta
          name="description"
          content={intl.formatMessage({ id: descriptionId })}
        />
      )}
      {(path || path === "") && (
        <link rel="canonical" href={`${baseUrl}${localePath(path, locale)}`} />
      )}
      {children}
    </Helmet>
  );
};
