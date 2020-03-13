import React from "react";
import { Normaltekst, Systemtittel } from "nav-frontend-typografi";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";

const className = "varselpanel";

type Props = {
  tittel?: string,
  tekst: string,
  type: AlertStripeType
};

export const VarselPanel = ({tittel, tekst, type}: Props) => (
  <AlertStripe className={className} type={type}>
    {tittel &&
      <Systemtittel className={`${className}__tittel`}>
        {tittel}
      </Systemtittel>
    }
    <Normaltekst className={`${className}__tekst`}>
      {tekst}
    </Normaltekst>
  </AlertStripe>
);
