import AlertStripe from "nav-frontend-alertstriper";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";

export const StorPaagangVarsel = () => (
  <AlertStripe type={"advarsel"} className={"stor-paagang-varsel"}>
    <Normaltekst className={"stor-paagang-tekst"}>
      {"Det er for tiden mange som kontakter oss. Hvis henvendelsen din ikke haster, ber vi deg ta kontakt senere."}
    </Normaltekst>
  </AlertStripe>
);