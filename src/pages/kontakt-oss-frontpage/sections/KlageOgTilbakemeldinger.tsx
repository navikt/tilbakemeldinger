import React from "react";
import { Link } from "react-router-dom";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import { urls } from "../../../Config";

const KlageOgTilbakemeldinger = () => {
  const tittel = <FormattedMessage id={"kontaktoss.klage.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div className={"box__section-description"}>
          <FormattedHTMLMessage id="kontaktoss.klage.beskrivelse" />
        </div>
        <Link className="lenke" to={urls.tilbakemeldinger.forside}>
          <FormattedMessage id="kontaktoss.klage.knapp" />
        </Link>
      </>
    </IkonPanel>
  );
};

export default KlageOgTilbakemeldinger;
