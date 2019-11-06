import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <p>
        <FormattedMessage id={"kontaktoss.chat.beskrivelse"} />
      </p>
      <ChevronLenke href={urls.chat.forside}>
        <FormattedMessage id={"kontaktoss.chat.knapp"} />
      </ChevronLenke>
    </IkonPanel>
  );
};

export default Chat;
