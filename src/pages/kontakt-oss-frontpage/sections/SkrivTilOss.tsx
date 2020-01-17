import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "Config";
import ikon from "assets/forside-skrivtiloss-ikon.svg";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import NavFrontendSpinner from "nav-frontend-spinner";

type Props = {
  svartid: number | null
};

const SkrivTilOss = ({svartid}: Props) => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  const onClick = () => {
    logEvent({ event: "skriv-til-oss" });
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <Normaltekst className="svartid">
            <FormattedMessage id={"kontaktoss.svartid"} />
            {svartid ? (
              <FormattedMessage
                id={svartid === 1 ? "kontaktoss.svartidendag" : "kontaktoss.svartiddager"}
                values={{ antall: svartid }}
              />
            ) : <NavFrontendSpinner type={"XXS"}/>}
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
