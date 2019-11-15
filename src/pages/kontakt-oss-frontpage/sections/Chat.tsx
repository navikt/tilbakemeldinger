import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenke";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenke href={urls.chat.forside}>
        <FormattedMessage id={"kontaktoss.chat.knapp"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default Chat;
