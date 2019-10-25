import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";

const SosialeMedier = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">NAV i sosiale medier</Undertittel>
    </div>
    <div className={"box__section-description"}>
      Du treffer oss på <a href="www.nav.no">Facebook</a>,{" "}
      <a href="ww.nav.no">Twitter</a>,<a href="ww.nav.no">Linkedin</a>,{" "}
      <a href="ww.nav.no">Instagram</a>, <a href="ww.nav.no">Snapchat</a>
      og <a href="ww.nav.no">Youtube</a>
    </div>
  </Box>
);

export default SosialeMedier;
