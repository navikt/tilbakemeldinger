import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import RingOss from "./RingOss";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import Lenke from "nav-frontend-lenker";

const SkrivTilOss = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">Chat</Undertittel>
      </div>
      <div className={"box__section-description"}>
        På chat kan vi ikke svare på saken din, men vi hjelper deg gjerne med
        generelle spørsmål.
      </div>
      <div className={"box__section-lenke"}>
        <Lenke href={"https://www.nav.no"}>Chat</Lenke>
      </div>
    </div>
    <RingOss />
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">Skriv til oss</Undertittel>
      </div>
      <div className={"box__section-description"}>
        Du kan ikke sende e-post til oss, men du kan sende spørsmål om saken din
        eller opplysninger til oss ved å logge inn og skrive til oss. Du får
        svar etter <b>omtrent 2 arbeidsdager</b>.
      </div>
      <div className={"box__section-lenke"}>
        <Link className={"lenke"} to={urls.skrivTilOss.forside}>
          Skriv til oss
        </Link>
      </div>
    </div>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">
          Kontakt din veileder via aktivitetsplanen
        </Undertittel>
      </div>
      <div className={"box__section-description"}>
        Du har en aktivietsplan dersom du er{" "}
        <Lenke className="lenke" href="www.nav.no">
          registrert som arbeidssøker
        </Lenke>
        . Da kan du kontakte din veileder og be om et møte eller råd under
        jobbsøkerprosessen. Svartiden varirerer.
      </div>
      <div className={"box__section-lenke"}>
        <Lenke href={"https://www.nav.no"}>
          Kontakt din veileder via aktivitetsplanen
        </Lenke>
      </div>
    </div>
  </Box>
);

export default SkrivTilOss;
