import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import Lenke from "../../../components/lenke/Lenke";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <Lenke href={urls.finnDittNavKontor} isExternal={true}>
          <FormattedMessage id="kontaktoss.navkontor.knapp" />
        </Lenke>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
