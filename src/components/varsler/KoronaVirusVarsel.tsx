import AlertStripe from "nav-frontend-alertstriper";
import { FormattedMessage } from "react-intl";
import RouterLenkeMedChevron from "../routerlenke/RouterLenkeMedChevron";
import { urls } from "../../Config";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";

export const KoronaVirusVarsel = () => (
  <AlertStripe type={"advarsel"} className={"korona-varsel"}>
    <Normaltekst className={"korona-tekst"}>
      <FormattedMessage id={"mye-paagang"}/>
    </Normaltekst>
    <RouterLenkeMedChevron href={urls.faq.koronavirus} isExternal={true} className={"korona-lenke"}>
      <FormattedMessage id={"faq.koronavirus"}/>
    </RouterLenkeMedChevron>
  </AlertStripe>
);