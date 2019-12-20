import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import { Normaltekst } from "nav-frontend-typografi";
import { urls, vars, visApningstiderJul } from "Config";
import ikon from "assets/forside-skrivtiloss-ikon.svg";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import TidsbestemtVisning from "../../../utils/TidsbestemtVisning";

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
            <TidsbestemtVisning fra={"00:00 01-01-2019"} til={visApningstiderJul.fra}>
              <FormattedMessage
                id={"kontaktoss.svartiddager"}
                values={{ antall: vars.svartid.skrivTilOss }}
              />
            </TidsbestemtVisning>
            <TidsbestemtVisning fra={visApningstiderJul.fra} til={visApningstiderJul.til}>
              <FormattedMessage id={"apningstid.avvik.skrivtiloss.svartid"} />
            </TidsbestemtVisning>
            <TidsbestemtVisning fra={visApningstiderJul.til} til={"00:00 01-01-2050"}>
              <FormattedMessage
                id={"kontaktoss.svartiddager"}
                values={{ antall: vars.svartid.skrivTilOss }}
              />
            </TidsbestemtVisning>
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
