import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type MergedProps = Props & RouteComponentProps;
const ScrollToTopOrId = ({ location, children }: MergedProps) => {
  const [anchorId, setAnchorId] = useState();

  useEffect(() => {
    const anchorIdFromUrl = location.hash.replace("#", "");
    anchorIdFromUrl && setAnchorId(anchorIdFromUrl);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const element = window.document.getElementById(anchorId);
    element ? element.scrollIntoView() : window.scrollTo(0, 0);
  }, [anchorId]);

  return <>{children}</> || null;
};

export default withRouter(ScrollToTopOrId);
