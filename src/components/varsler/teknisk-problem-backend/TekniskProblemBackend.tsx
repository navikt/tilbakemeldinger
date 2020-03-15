import AlertStripe from "nav-frontend-alertstriper";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";

export const TekniskProblemBackend = () => (
  <AlertStripe type={"feil"} className={"varsel-panel"}>
    <Normaltekst>
      <FormattedMessage id={"varsel.teknisk.feil"} />
    </Normaltekst>
  </AlertStripe>
);