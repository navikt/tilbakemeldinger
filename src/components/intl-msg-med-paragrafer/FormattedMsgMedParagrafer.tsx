import { FormattedMessage } from "react-intl";
import React, { JSXElementConstructor } from "react";

type MsgIdProp = {
  msgId: string,
  Component?: any,
};

const FormattedMsgMedParagrafer = ({msgId, Component}: MsgIdProp) => (
  <FormattedMessage
    id={msgId}
    values={{ p: (paragraf: string) => (Component ? <Component>{paragraf}</Component> : <p>{paragraf}</p>)}}
  />
);

export default FormattedMsgMedParagrafer;
