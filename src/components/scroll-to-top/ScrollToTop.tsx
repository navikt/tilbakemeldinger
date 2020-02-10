import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

type MergedProps = Props & RouteComponentProps;
const ScrollToTop = ({ location, children }: MergedProps) => {
  useEffect(() => {
    const anchorId = location.hash.replace("#", "");
    const element = window.document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return <>{children}</> || null;
};

export default withRouter(ScrollToTop);
