import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-navkontor-ikon.svg";
import RouterLenkeNoChevron from "../../../components/routerlenke/RouterLenkeMedChevron";

const FinnNavKontor = () => {
  const tittel = <FormattedMessage id={"kontaktoss.navkontor.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <RouterLenkeNoChevron
          href={urls.finnDittNavKontor}
          isExternal={true}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id="kontaktoss.navkontor.knapp" />
        </RouterLenkeNoChevron>
      </>
    </IkonPanel>
  );
};

export default FinnNavKontor;
