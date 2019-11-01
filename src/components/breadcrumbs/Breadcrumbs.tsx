import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";

import { HoyreChevron } from "nav-frontend-chevron";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../Config";
import HjemIkon from "assets/icons/line/home-1-line.svg";

type Props = {
  path: string;
};

const cssPrefix = "breadcrumbs";

const parsePath = (path: string, formatMessage: Function) => {
  const baseUrl = urls.baseUrl;
  const parts = path.replace(baseUrl, "").split("/");

  // Remove any trailing slash ("/")
  if (parts.length > 1 && parts[parts.length - 1] === "") {
    parts.pop();
  }

  return parts.map((part, index) => {
    const recombinedParts = parts.slice(0, index + 1);
    const url = recombinedParts.length === 1 ? "/" : recombinedParts.join("/");

    return {
      url: `${baseUrl}${url}`,
      label: formatMessage({id: `route.${part}`})
    };
  });
};

const Breadcrumbs = (props: Props) => {
  const { path } = props;
  const formatMessage = useIntl().formatMessage;

  const breadcrumbChain: Array<ReactNode> = [];
  const parsedPath = parsePath(path, formatMessage);

  breadcrumbChain.push(<img src={HjemIkon} alt="" className={`${cssPrefix}__ikon`} />);

  parsedPath.forEach((part, index) => {
    const current = index === parsedPath.length - 1;
    breadcrumbChain.push(
      <Normaltekst key={`crumb${index}`} className={`${cssPrefix}__item`}>
        { current
          ? part.label
          : (
            <>
              <Link to={part.url}>{part.label}</Link>
              <HoyreChevron key={`chevron${index}`} className={`${cssPrefix}__chevron`} />
            </>
          )
        }
      </Normaltekst>
    );
  });

  return (
    <div className={cssPrefix}>
      {breadcrumbChain.map((node: ReactNode) => (node))}
    </div>
  );
};

export default Breadcrumbs;
