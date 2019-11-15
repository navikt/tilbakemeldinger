import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-skrivtiloss-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenke";

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
        <RouterLenke
          href={urls.skrivTilOss.forside}
          className={"frontpage__lenke"}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
