import AlertStripe from "nav-frontend-alertstriper";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

export const StorPaagangVarsel = () => (
  <AlertStripe type={"advarsel"} className={"varsel-panel"}>
    <Normaltekst className={"stor-paagang-tekst"}>
      <FormattedMessage id={"varsel.stor.paagang"} />
    </Normaltekst>
  </AlertStripe>
);