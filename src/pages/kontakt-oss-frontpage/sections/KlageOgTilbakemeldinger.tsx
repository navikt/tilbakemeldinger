import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { urls } from "../../../Config";
import RouterLenke from "../../../components/routerlenke/RouterLenke";
import { Normaltekst } from "nav-frontend-typografi";

const KlageOgTilbakemeldinger = () => {
  const tittel = <FormattedMessage id={"kontaktoss.klage.tittel"} />;

  return (
    <IkonPanel tittel={tittel}>
      <Normaltekst>
        <RouterLenke
          href={urls.tilbakemeldinger.forside}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id="kontaktoss.klage.knapp" />
        </RouterLenke>
      </Normaltekst>
    </IkonPanel>
  );
};

export default KlageOgTilbakemeldinger;
