import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import ikon from "assets/forside-ringoss-ikon.svg";
import { urls } from "Config";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { KanalVisning } from "./KanalVisning";
import { ChannelType } from "../../../utils/sanity/endpoints/channel";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"}/>;
  const [{channels}] = useStore();

  const onClick = () => {
    logEvent({event: "ring-oss"});
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <KanalVisning isLoaded={channels.isLoaded} channelProps={channels.types[ChannelType.Telefon]}>
        <RouterLenke
          isExternal={true}
          href={urls.ringOss}
          onClick={onClick}
          className={"lenke__avstand-over"}
        >
          <FormattedMessage id={"kontaktoss.ringoss.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default RingOss;
