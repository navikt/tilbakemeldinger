import React from "react";
import { AlertStripeSuksess } from "nav-frontend-alertstriper";
import { Undertittel } from "nav-frontend-typografi";
import { Knapp } from "nav-frontend-knapper";
import VeilederIcon from "../../assets/Veileder.svg";
import Lenke from "nav-frontend-lenker";

const Takk = () => {
  document.title = "Takk - www.nav.no";

  return (
    <div className="takk__container">
      <img className="takk__icon" src={VeilederIcon} alt="Veileder" />
      <div className="takk__tittel">
        <Undertittel>Takk for meldingen din!</Undertittel>
      </div>
      <div className="takk__alert">
        <AlertStripeSuksess>Meldingen din er sendt</AlertStripeSuksess>
      </div>
      <div className="takk__knapp">
        <Lenke href={"https://www.nav.no"}>
          <Knapp>Gå til nav.no</Knapp>
        </Lenke>
      </div>
    </div>
  );
};
export default Takk;
