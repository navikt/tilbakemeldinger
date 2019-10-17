import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Innholdstittel } from "nav-frontend-typografi";
import Veileder from "nav-frontend-veileder";
import VeilederIcon from "../../assets/Veileder.svg";
import { baseUrl } from "../../App";

interface Props {
  title?: string;
}
const Header = (props: Props & RouteComponentProps) =>
  props.location.pathname === "/" || props.location.pathname === baseUrl ? (
    <div className="header header__frontpage">
      <div className="header__icon">
        <Veileder
          tekst="Velkommen til NAV!"
          posisjon="topp"
        >
          <img src={VeilederIcon} alt="Veileder" />
        </Veileder>
      </div>
    </div>
  ) : (
    <div className="header">
      {props.title && (
        <Innholdstittel className="header__tittel">
          {props.title}
        </Innholdstittel>
      )}
    </div>
  );

export default withRouter(Header);
