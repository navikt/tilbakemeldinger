import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import Lenke from "nav-frontend-lenker";

const Tolketjenesten = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div className={"box__section-description"}>
        <div className="faq__lenke">
          <Lenke href={urls.tolketjenesten}>
            <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
          </Lenke>
        </div>
        <div className="faq__lenke">
          <Lenke href={urls.spraktolk}>
            <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
          </Lenke>
        </div>
      </div>
    </IkonPanel>
  );
};

export default Tolketjenesten;
