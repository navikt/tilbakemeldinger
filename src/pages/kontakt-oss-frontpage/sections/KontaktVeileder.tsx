import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";
import ikon from "assets/forside-veileder-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { KanalVisning } from "./KanalVisning";

const KontaktVeileder = () => {
  const tittel = <FormattedMessage id={"kontaktoss.kontaktveileder.tittel"}/>;
  const [{channels}] = useStore();

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <KanalVisning isLoaded={channels.isLoaded} channelProps={channels.types.kontaktVeileder}>
        <RouterLenke
          href={urls.aktivitetsplanDialog}
          className={"lenke__avstand-over"}
          isExternal={true}
        >
          <FormattedMessage id={"kontaktoss.kontaktveileder.knapp"}/>
        </RouterLenke>
      </KanalVisning>
    </IkonPanel>
  );
};

export default KontaktVeileder;
