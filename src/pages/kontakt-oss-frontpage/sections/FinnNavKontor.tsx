import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <RouterLenke
          href={urls.finnDittNavKontor}
          isExternal={true}
          className={"lenke__avstand-under"}
        >
          <FormattedMessage id="kontaktoss.navkontor.lenke" />
        </RouterLenke>
        <RouterLenke
          href={urls.finnDinHjelpemiddelsentral}
          isExternal={true}
        >
          <FormattedMessage id="kontaktoss.hjelpemiddelsentral.lenke" />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
