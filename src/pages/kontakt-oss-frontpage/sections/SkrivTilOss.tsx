import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "Config";
import ikon from "assets/forside-skrivtiloss-ikon.svg";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  const onClick = () => {
    logEvent({ event: "skriv-til-oss" });
  };

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
          className={"lenke__avstand-over"}
          onClick={onClick}
        >
          <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
        </RouterLenke>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
