import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-facebook-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const Facebook = () => {
  const tittel = <FormattedMessage id={"kontaktoss.facebook.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <ChevronLenke
        href={urls.facebook.foreldrepenger}
        isExternal={true}
      >
        <FormattedMessage id={"kontaktoss.facebook.foreldrepenger"} />
      </ChevronLenke>
      <ChevronLenke
        href={urls.facebook.jobblyst}
        isExternal={true}
      >
        <FormattedMessage id={"kontaktoss.facebook.jobblyst"} />
      </ChevronLenke>
    </IkonPanel>
  );
};

export default Facebook;
