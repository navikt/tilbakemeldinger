import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { urls } from "../../../Config";
import Lenke from "../../../components/lenke/Lenke";
import { Normaltekst } from "nav-frontend-typografi";

const KlageOgTilbakemeldinger = () => {
  const tittel = <FormattedMessage id={"kontaktoss.klage.tittel"} />;

  return (
    <IkonPanel tittel={tittel} className={"klage-og-tilbakemeldinger"}>
      <Normaltekst>
        <Lenke
          href={urls.tilbakemeldinger.forside}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id="kontaktoss.klage.knapp" />
        </Lenke>
      </Normaltekst>
    </IkonPanel>
  );
};

export default KlageOgTilbakemeldinger;
