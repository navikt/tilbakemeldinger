import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";

const FeilOgMangler = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">
        Feil og mangler på nav.no
      </Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <a className="lenke" href={urls.tekniskBrukerstotte.selvhjelp}>
          Prøv å løse problemet selv
        </a>
      </div>
      <div className="faq__lenke">
        <Link className="lenke" to={urls.tilbakemeldinger.feilogmangler}>
          Meld ifra om feil og mangler
        </Link>
      </div>
      <div className="faq__lenke">
        <a className="lenke" href={urls.tekniskBrukerstotte.ring}>
          Ring teknisk brukerstøtte
        </a>
      </div>
    </div>
  </Box>
);

export default FeilOgMangler;
