import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-veileder-ikon.svg";
import Lenke from "../../../components/lenke/Lenke";

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
        <Lenke
          href={urls.aktivitetsplan}
          className={"frontpage__lenke"}
          isExternal={true}
        >
          <FormattedMessage id={"kontaktoss.kontaktveileder.knapp"} />
        </Lenke>
      </>
    </IkonPanel>
  );
};

export default KontaktVeileder;
