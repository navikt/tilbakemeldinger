import React from "react";
import { FormattedMessage } from "react-intl";
import { urls } from "Config";
import IkonPanel from "components/ikonpanel/IkonPanel";
import ikon from "assets/forside-chat-ikon.svg";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { logEvent } from "utils/logger";
import { useStore } from "../../../providers/Provider";
import { KanalVisning } from "./KanalVisning";

const Chat = () => {
  const tittel = <FormattedMessage id={"kontaktoss.chat.tittel"}/>;
  const [{channels}] = useStore();

  const onClick = () => {
    logEvent({event: "chat"});
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <KanalVisning isLoaded={channels.isLoaded} channelProps={channels.props.chat}>
        <RouterLenke
          href={urls.chat.forside}
          onClick={onClick}
          className={"lenke__avstand-over"}
        >
          <FormattedMessage id={"kontaktoss.chat.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default Chat;
