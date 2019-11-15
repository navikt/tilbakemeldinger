import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-presse-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenke";

const Pressekontakt = () => {
  const tittel = <FormattedMessage id={"kontaktoss.presse.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <RouterLenke
          href={urls.presseKontakt}
          isExternal={true}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id="kontaktoss.presse.link" />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default Pressekontakt;
