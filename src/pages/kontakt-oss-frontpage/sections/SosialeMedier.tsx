import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-sosialemedier-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const SosialeMedier = () => {
  const tittel = <FormattedMessage id={"kontaktoss.sosialemedier.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div>
        <RouterLenke
          href={urls.sosialeMedier}
          isExternal={true}
        >
          <FormattedMessage id={"kontaktoss.sosialemedier.link"} />
        </RouterLenke>
      </div>
    </IkonPanel>
  );
};

export default SosialeMedier;
