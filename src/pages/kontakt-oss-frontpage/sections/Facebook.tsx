import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-facebook-ikon.svg";
import Lenke from "../../../components/lenke/Lenke";

const Facebook = () => {
  const tittel = <FormattedMessage id={"kontaktoss.facebook.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <Lenke href={urls.facebook.foreldrepenger} isExternal={true}>
        <FormattedMessage id={"kontaktoss.facebook.foreldrepenger"} />
      </Lenke>
      <Lenke href={urls.facebook.jobblyst} isExternal={true}>
        <FormattedMessage id={"kontaktoss.facebook.jobblyst"} />
      </Lenke>
    </IkonPanel>
  );
};

export default Facebook;
