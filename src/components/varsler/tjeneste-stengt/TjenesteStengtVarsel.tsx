import AlertStripe from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import React from "react";

export const TjenesteStengtVarsel = () => (
  <AlertStripe type="advarsel" className={"varsel-panel"}>
    <FormattedMessage id={"tjeneste.stengt"} />
  </AlertStripe>
);
