import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "../../../Config";
import RouterLenke from "../../../components/routerlenke/RouterLenke";
import { logEvent } from "../../../utils/logger";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  const onClick = () => {
    logEvent({ event: "ring-oss" });
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <RouterLenke isExternal={true} href={urls.ringOss} onClick={onClick}>
        <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default RingOss;
