import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type MergedProps = Props & RouteComponentProps;
const ScrollToTopOrAnchor = ({ location, children }: MergedProps) => {
  useEffect(() => {
    const anchorHash = location.hash.replace("#", "");
    const element = window.document.getElementById(anchorHash);
    element ? element.scrollIntoView() : window.scrollTo(0, 0);
    // window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return <>{children}</> || null;
};

export default withRouter(ScrollToTopOrAnchor);
