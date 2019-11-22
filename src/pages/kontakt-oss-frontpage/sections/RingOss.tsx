import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "../../../Config";
import RouterLenkeNoChevron from "../../../components/routerlenke/RouterLenkeMedChevron";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <RouterLenkeNoChevron isExternal={true} href={urls.ringOss}>
        <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
      </RouterLenkeNoChevron>
    </IkonPanel>
  );
};

export default RingOss;
