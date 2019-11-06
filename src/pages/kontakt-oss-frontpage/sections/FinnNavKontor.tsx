import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-chat-ikon.svg";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div className={"box__section-description"}>
          <FormattedHTMLMessage id="kontaktoss.navkontor.beskrivelse" />
        </div>
        <a className="lenke" href={urls.finnDittNavKontor}>
          <FormattedMessage id="kontaktoss.navkontor.knapp" />
        </a>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
