import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <FormattedMessage id={"kontaktoss.chat.beskrivelse"} />
      <Link className={"lenke"} to={urls.chat.forside}>
        <FormattedMessage id={"kontaktoss.chat.knapp"} />
      </Link>
    </IkonPanel>
  );
};

export default Chat;
