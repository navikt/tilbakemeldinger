import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <ChevronLenke
          href={urls.finnDittNavKontor}
          isExternal={true}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id="kontaktoss.navkontor.knapp" />
        </ChevronLenke>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
