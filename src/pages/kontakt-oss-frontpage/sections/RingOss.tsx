import React from "react";
import { FormattedMessage } from "react-intl";
import IkonPanel from "components/ikonpanel/IkonPanel";
import ikon from "assets/forside-ringoss-ikon.svg";
import { urls, visApningstiderJul } from "Config";
import { logEvent } from "utils/logger";
import RouterLenke from "components/routerlenke/RouterLenkeMedChevron";
import TidsbestemtVisning from "../../../utils/TidsbestemtVisning";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;

  const onClick = () => {
    logEvent({ event: "ring-oss" });
  };

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <RouterLenke isExternal={true} href={urls.ringOss} onClick={onClick}>
        <FormattedMessage id={"kontaktoss.ringoss.knapp"} />
      </RouterLenke>
      <TidsbestemtVisning fra={visApningstiderJul.fra} til={visApningstiderJul.til}>
        <RouterLenke isExternal={true} href={urls.apningstiderJulTlf} onClick={onClick}>
          <FormattedMessage id={"apningstid.avvik.ringoss.lenke"} />
        </RouterLenke>
      </TidsbestemtVisning>
    </IkonPanel>
  );
};

export default RingOss;
