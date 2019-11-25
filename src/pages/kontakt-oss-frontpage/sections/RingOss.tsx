import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "../../../Config";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <RouterLenke isExternal={true} href={urls.ringOss}>
        <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default RingOss;
