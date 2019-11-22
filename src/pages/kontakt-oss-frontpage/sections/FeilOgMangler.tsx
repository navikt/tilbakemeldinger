import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import RouterLenkeNoChevron from "../../../components/routerlenke/RouterLenkeMedChevron";

const FeilOgMangler = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />;

  return (
    <IkonPanel tittel={tittel}>
      <RouterLenkeNoChevron
        href={urls.tekniskBrukerstotte.selvhjelp}
        className={"lenke__avstand-under"}
        isExternal={true}
      >
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
      </RouterLenkeNoChevron>
      <RouterLenkeNoChevron
        href={urls.tilbakemeldinger.feilogmangler}
        className={"lenke__avstand-under"}
      >
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
      </RouterLenkeNoChevron>
      <RouterLenkeNoChevron href={urls.tekniskBrukerstotte.ring} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
      </RouterLenkeNoChevron>
    </IkonPanel>
  );
};

export default FeilOgMangler;
