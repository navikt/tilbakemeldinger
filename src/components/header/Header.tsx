import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Undertittel } from "nav-frontend-typografi";
import Veileder from "nav-frontend-veileder";
import VeilederIcon from "../../assets/Veileder.svg";
import { baseUrl } from "../../App";

const ColorBar = (props: RouteComponentProps) =>
  props.location.pathname === "/" || props.location.pathname === baseUrl ? (
    <div className="header header__frontpage">
      <div className="header__icon">
        <Veileder
          tekst="Hei! Vi vil gjerne høre om opplevelsen din!"
          posisjon="topp"
        >
          <img src={VeilederIcon} alt="Veileder" />
        </Veileder>
      </div>
    </div>
  ) : (
    <div className="header">
      <Undertittel>Tilbakemelding på service</Undertittel>
    </div>
  );
export default withRouter(ColorBar);
