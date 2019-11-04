import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { HoyreChevron } from "nav-frontend-chevron";
import { Normaltekst } from "nav-frontend-typografi";

type BreadcrumbsProps = {
  currentPath: string;
  basePath: string;
  baseLenker?: Array<BreadcrumbLenke>;
  ikonUrl?: string;
};

type SegmentProps = {
  lenke: BreadcrumbLenke;
  key: string;
  isCurrentPath: boolean;
  formatMessage: Function;
};

export type BreadcrumbLenke = {
  url: string;
  lenketekstId: string;
};

const cssPrefix = "breadcrumbs";

const getSegmentLenker = (currentPath: string, basePath: string): Array<BreadcrumbLenke> => {
  const pathSegments = currentPath.replace(basePath, "").split("/");

  // fjerner tomt segment ved trailing slash
  if (pathSegments.length > 1 && pathSegments[pathSegments.length - 1] === "") {
    pathSegments.pop();
  }

  return pathSegments.map((segment, index) => {
    const combinedSegments = pathSegments.slice(0, index + 1);
    const segmentPath = combinedSegments.length === 1 ? "/" : combinedSegments.join("/");

    return {
      url: `${basePath}${segmentPath}`,
      lenketekstId: `route.${segment}`,
    };
  });
};

const SegmentNode = ({lenke, isCurrentPath, formatMessage}: SegmentProps) => {
  const lenketekst = formatMessage({id: lenke.lenketekstId});

  return (
    <Normaltekst className={`${cssPrefix}__segment`}>
      { isCurrentPath
        ? lenketekst
        : (
          <>
            <Link to={lenke.url} className="lenke">{lenketekst}</Link>
            <HoyreChevron className={`${cssPrefix}__chevron`} />
          </>
        )
      }
    </Normaltekst>
  );
};

const Breadcrumbs = ({currentPath, basePath, baseLenker, ikonUrl}: BreadcrumbsProps) => {
  const segmentLenker = getSegmentLenker(currentPath, basePath);
  const formatMessage = useIntl().formatMessage;

  return (
    <div className={cssPrefix}>
      {ikonUrl && <img src={ikonUrl} alt="" className={`${cssPrefix}__ikon`} />}
      {baseLenker && baseLenker.map((lenke: BreadcrumbLenke, index: number) => (
        <SegmentNode
          lenke={lenke}
          isCurrentPath={false}
          formatMessage={formatMessage}
          key={`rootSegment-${index}`}
        />
      ))}
      {segmentLenker.map((lenke: BreadcrumbLenke, index: number) => (
        <SegmentNode
          lenke={lenke}
          isCurrentPath={index === segmentLenker.length - 1}
          formatMessage={formatMessage}
          key={`segment-${index}`}
        />
      ))}
    </div>
  );
};

export default Breadcrumbs;
