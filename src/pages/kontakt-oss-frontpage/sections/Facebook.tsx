import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-facebook-ikon.svg";
import RouterLenkeNoChevron from "../../../components/routerlenke/RouterLenkeMedChevron";

const Facebook = () => {
  const tittel = <FormattedMessage id={"kontaktoss.facebook.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenkeNoChevron
        href={urls.facebook.foreldrepenger}
        isExternal={true}
        className={"lenke__avstand-under"}
      >
        <FormattedMessage id={"kontaktoss.facebook.foreldrepenger"} />
      </RouterLenkeNoChevron>
      <RouterLenkeNoChevron href={urls.facebook.jobblyst} isExternal={true}>
        <FormattedMessage id={"kontaktoss.facebook.jobblyst"} />
      </RouterLenkeNoChevron>
    </IkonPanel>
  );
};

export default Facebook;
