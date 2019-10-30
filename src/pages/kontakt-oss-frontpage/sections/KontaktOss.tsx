import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import RingOss from "./RingOss";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import Lenke from "nav-frontend-lenker";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

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
        <Link to={urls.chat.forside}>
          <FormattedMessage id={"kontaktoss.chat.knapp"} />
        </Link>
      </div>
    </div>
    <RingOss />
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">
          <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />
        </Undertittel>
      </div>
      <div className={"box__section-description"}>
        <FormattedHTMLMessage id={"kontaktoss.skrivtiloss.beskrivelse"} />
      </div>
      <div className={"box__section-lenke"}>
        <Link className={"lenke"} to={urls.skrivTilOss.forside}>
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
        </Link>
      </div>
    </div>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">
          <FormattedMessage id={"kontaktoss.aktivitetsplan.tittel"} />
        </Undertittel>
      </div>
      <div className={"box__section-description"}>
        <FormattedHTMLMessage id={"kontaktoss.aktivitetsplan.beskrivelse"} />
      </div>
      <div className={"box__section-lenke"}>
        <Lenke href={urls.aktivitetsplan}>
          <FormattedMessage id={"kontaktoss.aktivitetsplan.knapp"} />
        </Lenke>
      </div>
    </div>
  </Box>
);

export default SkrivTilOss;
