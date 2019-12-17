import { FormattedMessage } from "react-intl";
import React from "react";

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
      p: (paragraf: string) => (Component ? <Component>{paragraf}</Component> : <p>{paragraf}</p>),
      ...values
    }}
  />
);

export default FormattedMsgMedParagrafer;
