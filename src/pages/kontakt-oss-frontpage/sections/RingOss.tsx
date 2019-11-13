import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "../../../Config";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <ChevronLenke isExternal={true} href={urls.ringOss}>
        <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
      </ChevronLenke>
    </IkonPanel>
  );
};

export default RingOss;
