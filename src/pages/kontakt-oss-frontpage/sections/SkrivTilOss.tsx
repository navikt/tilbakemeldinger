import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import { urls } from "Config";
import ikon from "assets/forside-skrivtiloss-ikon.svg";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { KanalVisning } from "./KanalVisning";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"}/>;
  const [{channelProps}] = useStore();

  const onClick = () => {
    logEvent({event: "skriv-til-oss"});
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <KanalVisning channelProps={channelProps.write}>
        <RouterLenke
          href={urls.skrivTilOss.forside}
          className={"lenke__avstand-over"}
          onClick={onClick}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default SkrivTilOss;
