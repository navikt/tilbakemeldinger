import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { urls } from "../../../Config";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";
import { Normaltekst } from "nav-frontend-typografi";

const KlageOgTilbakemeldinger = () => {
  const tittel = <FormattedMessage id={"kontaktoss.klage.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className={"klage-og-tilbakemeldinger"}>
      <Normaltekst>
        <FormattedMessage id="kontaktoss.klage.beskrivelse" />
      </Normaltekst>
      <Normaltekst>
        <ChevronLenke href={urls.tilbakemeldinger.forside}>
          <FormattedMessage id="kontaktoss.klage.knapp" />
        </ChevronLenke>
      </Normaltekst>
    </IkonPanel>
  );
};

export default KlageOgTilbakemeldinger;
