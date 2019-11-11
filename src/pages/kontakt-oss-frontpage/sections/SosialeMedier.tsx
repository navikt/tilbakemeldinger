import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-facebook-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const urlSosialeMedier = urls.sosialeMedier;

const SosialeMedier = () => {
  const tittel = <FormattedMessage id={"kontaktoss.sosialemedier.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div>
        <FormattedMessage id={"kontaktoss.sosialemedier.beskrivelse"} />
      </div>
      <div>
        <ChevronLenke
          href={urlSosialeMedier}
          isExternal={true}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id={"kontaktoss.sosialemedier.link"} />
        </ChevronLenke>
      </div>
    </IkonPanel>
  );
};

export default SosialeMedier;
