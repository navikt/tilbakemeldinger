import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import { urls } from "../../../Config";
import ikon from "assets/forside-veileder-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { KanalVisning } from "./KanalVisning";
import { Kanal } from "../../../types/kanaler";

const KontaktVeileder = () => {
  const tittel = <FormattedMessage id={"kontaktoss.kontaktveileder.tittel"}/>;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <KanalVisning kanal={Kanal.KontaktVeileder}>
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
