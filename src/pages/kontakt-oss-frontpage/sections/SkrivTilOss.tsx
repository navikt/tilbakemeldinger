import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { Link } from "react-router-dom";

import { urls } from "Config";

const SkrivTilOss = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">Skriv til oss</Undertittel>
      </div>
      <div className={"box__section-description"}>
        Du kan ikke sende e-post til oss, men du kan sende spørsmål om saken din
        eller opplysninger til oss ved åå logge inn og skrive til oss. Du får
        svar etter <b>omtrent 2 arbeidsdager</b>
      </div>
      <div className={"box__section-lenke"}>
        <Link className={"lenke"} to={urls.skrivTilOss.forside}>
          Skriv til oss
        </Link>
      </div>
    </div>
  </Box>
);

export default SkrivTilOss;
