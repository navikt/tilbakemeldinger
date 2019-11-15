import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import RouterLenke from "../../../components/routerlenke/RouterLenke";

const FeilOgMangler = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className={"feil-og-mangler"}>
      <RouterLenke href={urls.tekniskBrukerstotte.selvhjelp} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
      </RouterLenke>
      <RouterLenke href={urls.tilbakemeldinger.feilogmangler}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
      </RouterLenke>
      <RouterLenke href={urls.tekniskBrukerstotte.ring} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
      </RouterLenke>
    </IkonPanel>
  );
};

export default FeilOgMangler;
