import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-sosialemedier-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const SosialeMedier = () => {
  const tittel = <FormattedMessage id={"kontaktoss.sosialemedier.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div>
        <ChevronLenke
          href={urls.sosialeMedier}
          isExternal={true}
        >
          <FormattedMessage id={"kontaktoss.sosialemedier.link"} />
        </ChevronLenke>
      </div>
    </IkonPanel>
  );
};

export default SosialeMedier;
