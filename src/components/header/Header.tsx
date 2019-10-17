import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Innholdstittel } from "nav-frontend-typografi";

interface Props {
  title?: string;
}
const Header = (props: Props & RouteComponentProps) => (
  <div className="header">
    {props.title && (
      <Innholdstittel className="header__tittel">{props.title}</Innholdstittel>
    )}
  </div>
);

export default withRouter(Header);
