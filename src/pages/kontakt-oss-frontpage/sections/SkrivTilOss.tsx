import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import RingOss from "./RingOss";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";

const SkrivTilOss = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">
          <FormattedMessage id={"kontaktoss.chat.tittel"} />
        </Undertittel>
      </div>
      <div className={"box__section-description"}>
        <FormattedMessage id={"kontaktoss.chat.beskrivelse"} />
      </div>
      <div className={"box__section-lenke"}>
        <Lenke href={urls.chat}>
          <FormattedMessage id={"kontaktoss.chat.knapp"} />
        </Lenke>
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
        <Lenke href={urls.arbeidssoker}>registrert som arbeidssøker</Lenke>. Da
        kan du kontakte din veileder og be om et møte eller råd under
        jobbsøkerprosessen. Svartiden varirerer.
      </div>
      <div className={"box__section-lenke"}>
        <Lenke href={urls.aktivitetsplan}>
          Kontakt din veileder via aktivitetsplanen
        </Lenke>
      </div>
    </div>
  </Box>
);

export default SkrivTilOss;
