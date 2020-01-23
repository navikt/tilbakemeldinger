import React from "react";
import { FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Normaltekst } from "nav-frontend-typografi";
import { urls, vars } from "../../../Config";

import ikon from "assets/forside-veileder-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const KontaktVeileder = () => {
  const tittel = <FormattedMessage id={"kontaktoss.kontaktveileder.tittel"} />;
  const svartid = vars.svartid.kontaktVeileder;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <Normaltekst className="svartid">
            <FormattedMessage id={"kontaktoss.svartid"} />
            <FormattedMessage
              id={svartid === 1 ? "kontaktoss.svartidendag" : "kontaktoss.svartiddager"}
              values={{ antall: svartid }}
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
