import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

const FeilOgMangler = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">
        <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />
      </Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <a className="lenke" href={urls.tekniskBrukerstotte.selvhjelp}>
          <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
        </a>
      </div>
      <div className="faq__lenke">
        <Link className="lenke" to={urls.tilbakemeldinger.feilogmangler}>
          <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
        </Link>
      </div>
      <div className="faq__lenke">
        <a className="lenke" href={urls.tekniskBrukerstotte.ring}>
          <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
        </a>
      </div>
    </div>
  </Box>
);

export default FeilOgMangler;
