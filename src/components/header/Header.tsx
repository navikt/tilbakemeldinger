import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Sidetittel } from "nav-frontend-typografi";

interface Props {
  title?: string;
}
const Header = (props: Props & RouteComponentProps) => (
  <div className="header">
    {props.title && (
      <Sidetittel className="header__tittel">{props.title}</Sidetittel>
    )}
  </div>
);

export default withRouter(Header);
