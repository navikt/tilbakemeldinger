import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-tolk-ikon.svg";
import Lenke from "../../../components/lenke/Lenke";

const Tolketjenesten = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <Lenke
        href={urls.tolketjenesten}
        isExternal={true}
        className={"lenke__space"}
      >
        <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
      </Lenke>
      <Lenke href={urls.spraktolk} isExternal={true} className={"lenke__space"}>
        <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
      </Lenke>
    </IkonPanel>
  );
};

export default Tolketjenesten;
