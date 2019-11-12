import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-skrivtiloss-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <Normaltekst className="svartid">
            <FormattedMessage
              id={"kontaktoss.svartiddager"}
              values={{ antall: 4 }}
            />
          </Normaltekst>
          <Normaltekst>
            <FormattedMessage id={"kontaktoss.skrivtiloss.beskrivelse"} />
          </Normaltekst>
        </div>
        <ChevronLenke
          href={urls.skrivTilOss.forside}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
        </ChevronLenke>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
