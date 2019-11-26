import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-veileder-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const KontaktVeileder = () => {
  const tittel = <FormattedMessage id={"kontaktoss.kontaktveileder.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <Normaltekst className="svartid">
            <FormattedMessage
              id={"kontaktoss.svartiddager"}
              values={{ antall: 2 }}
            />
          </Normaltekst>
          <Normaltekst>
            <FormattedMessage id={"kontaktoss.kontaktveileder.beskrivelse"} />
          </Normaltekst>
        </div>
        <RouterLenke
          href={urls.aktivitetsplanDialog}
          className={"lenke__avstand-over"}
          isExternal={true}
        >
          <FormattedMessage id={"kontaktoss.kontaktveileder.knapp"} />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default KontaktVeileder;
