import { FormattedMessage } from "react-intl";
import React from "react";

type Props = {
  id: string,
  Component?: any,
};

const FormattedMsgMedParagrafer = ({id, Component}: Props) => (
  <FormattedMessage
    id={id}
    values={{
      p: (paragraf: string) => (Component ? <Component>{paragraf}</Component> : <p>{paragraf}</p>),
    }}
  />
);

export default FormattedMsgMedParagrafer;
