import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";

import ikon from "assets/forside-tolk-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const Tolketjenesten = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <ChevronLenke href={urls.tolketjenesten} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
      </ChevronLenke>
      <ChevronLenke href={urls.spraktolk} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
      </ChevronLenke>
    </IkonPanel>
  );
};

export default Tolketjenesten;
