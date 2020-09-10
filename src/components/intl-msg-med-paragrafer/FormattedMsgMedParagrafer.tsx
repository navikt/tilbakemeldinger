import { FormattedMessage } from "react-intl";
import React from "react";
import { Normaltekst } from "nav-frontend-typografi";

type Props = {
  id: string,
  Component?: any,
  values?: {
    [key: string]: string
  }
};

const FormattedMsgMedParagrafer = ({id, Component, values}: Props) => (
  <FormattedMessage
    id={id}
    values={{
      p: (paragraf: string) => (Component ? <Component>{paragraf}</Component> : <Normaltekst>{paragraf}</Normaltekst>),
      ...values
    }}
  />
);

export default FormattedMsgMedParagrafer;
