import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-tolk-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenke";

const Tolketjenesten = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenke
        href={urls.tolketjenesten}
        isExternal={true}
        className={"lenke__avstand-under"}
      >
        <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
      </RouterLenke>
      <RouterLenke href={urls.spraktolk} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default Tolketjenesten;
