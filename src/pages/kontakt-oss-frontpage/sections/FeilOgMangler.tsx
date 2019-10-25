import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import Environment from "../../../Environments";
const { baseUrl } = Environment();

const externalUrls = {
  selvhjelp: `${baseUrl}/no/NAV+og+samfunn/Kontakt+NAV/Teknisk+brukerstotte/hjelp-til-personbruker?kap=398749`,
  ring: `${baseUrl}/no/NAV+og+samfunn/Kontakt+NAV/Relatert+informasjon/kontakt-teknisk-brukerst%C3%B8tte-nav.no`
};

const FeilOgMangler = () => (
  <Box icon={VeilederIcon} margin={"0.5rem 0 0 0"}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">
        Feil og mangler på nav.no
      </Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <a className="lenke" href={externalUrls.selvhjelp}>
          Prøv å løse problemet selv
        </a>
      </div>
      <div className="faq__lenke">
        <Link className="lenke" to={urls.tilbakemeldinger.feilogmangler}>
          Meld ifra om feil og mangler
        </Link>
      </div>
      <div className="faq__lenke">
        <a className="lenke" href={externalUrls.ring}>
          Prøv å løse problemet selv
        </a>
      </div>
    </div>
  </Box>
);

export default FeilOgMangler;
