import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import RouterLenkeNoChevron from "../../../components/routerlenke/RouterLenkeMedChevron";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <RouterLenkeNoChevron href={urls.chat.forside}>
        <FormattedMessage id={"kontaktoss.chat.knapp"} />
      </RouterLenkeNoChevron>
    </IkonPanel>
  );
};

export default Chat;
