import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <FormattedHTMLMessage id="kontaktoss.navkontor.beskrivelse" />
        </div>
        <ChevronLenke href={urls.finnDittNavKontor} isExternal={true}>
          <FormattedMessage id="kontaktoss.navkontor.knapp" />
        </ChevronLenke>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
