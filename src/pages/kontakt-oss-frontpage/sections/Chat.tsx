import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenke";
import { logEvent } from "../../../utils/logger";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"} />;

  const onClick = () => {
    logEvent({ event: "chat" });
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenke href={urls.chat.forside} onClick={onClick}>
        <FormattedMessage id={"kontaktoss.chat.knapp"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default Chat;
