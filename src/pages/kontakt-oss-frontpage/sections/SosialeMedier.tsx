import React from "react";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";

const urlSosialeMedier = urls.sosialeMedier;

const SosialeMedier = () => {
  const tittel = <FormattedMessage id={"kontaktoss.sosialemedier.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div className={"box__section-description"}>
        <FormattedMessage id={"kontaktoss.sosialemedier.beskrivelse"} />
      </div>
      <div className="faq__lenke">
        <a className="lenke" href={urlSosialeMedier}>
          <FormattedMessage id={"kontaktoss.sosialemedier.link"} />
        </a>
      </div>
    </IkonPanel>
  );
};

export default SosialeMedier;
