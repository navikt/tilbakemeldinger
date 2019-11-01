import React, { ReactNode } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { HoyreChevron } from "nav-frontend-chevron";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../Config";
import HjemIkon from "assets/icons/line/home-1-line.svg";

type Props = {
  path: string;
};

type LenkeData = {
  url: string,
  lenketekst: string,
};

const cssPrefix = "breadcrumbs";

const getPathSegmentLenker = (path: string, formatMessage: Function): Array<LenkeData> => {
  const basePath = urls.baseUrl;
  const pathSegments = path.replace(basePath, "").split("/");

  // fjerner tomt segment ved trailing slash
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === "") {
    pathSegments.pop();
  }

  return pathSegments.map((segment, index) => {
    const combinedSegments = pathSegments.slice(0, index + 1);
    const segmentPath = combinedSegments.length === 1 ? "/" : combinedSegments.join("/");

    return {
      url: `${basePath}${segmentPath}`,
      lenketekst: formatMessage({id: `route.${segment}`})
    };
  });
};

const Breadcrumbs = (props: Props) => {
  const { path } = props;
  const formatMessage = useIntl().formatMessage;

  const breadcrumbsNoder: Array<ReactNode> = [];
  const pathSegmentLenker = getPathSegmentLenker(path, formatMessage);

  breadcrumbsNoder.push(<img src={HjemIkon} alt="" className={`${cssPrefix}__ikon`} />);

  pathSegmentLenker.forEach((segment, index) => {
    const isCurrentPath = index === pathSegmentLenker.length - 1;
    breadcrumbsNoder.push(
      <Normaltekst key={`crumb${index}`} className={`${cssPrefix}__segment`}>
        { isCurrentPath
          ? segment.lenketekst
          : (
            <>
              <Link to={segment.url} className="lenke">{segment.lenketekst}</Link>
              <HoyreChevron key={`chevron${index}`} className={`${cssPrefix}__chevron`} />
            </>
          )
        }
      </Normaltekst>
    );
  });

  return (
    <div className={cssPrefix}>
      {breadcrumbsNoder.map((node: ReactNode) => (node))}
    </div>
  );
};

export default Breadcrumbs;
