import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import Lenke from "../../../components/lenke/Lenke";

const FeilOgMangler = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className={"feil-og-mangler"}>
      <Lenke href={urls.tekniskBrukerstotte.selvhjelp} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
      </Lenke>
      <Lenke href={urls.tilbakemeldinger.feilogmangler}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
      </Lenke>
      <Lenke href={urls.tekniskBrukerstotte.ring} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
      </Lenke>
    </IkonPanel>
  );
};

export default FeilOgMangler;
