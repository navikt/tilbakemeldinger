import React from "react";
import { FormattedMessage } from "react-intl";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const FeilOgMangler = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className={"feil-og-mangler"}>
      <ChevronLenke href={urls.tekniskBrukerstotte.selvhjelp} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
      </ChevronLenke>
      <ChevronLenke href={urls.tilbakemeldinger.feilogmangler}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
      </ChevronLenke>
      <ChevronLenke href={urls.tekniskBrukerstotte.ring} isExternal={true}>
        <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
      </ChevronLenke>
    </IkonPanel>
  );
};

export default FeilOgMangler;
