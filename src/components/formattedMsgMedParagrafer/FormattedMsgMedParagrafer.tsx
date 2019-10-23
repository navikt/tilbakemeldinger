import { FormattedMessage } from "react-intl";
import React from "react";

type MsgIdProp = {
  msgId: string,
};

const FormattedMsgMedParagrafer = ({msgId}: MsgIdProp) => (
  <FormattedMessage
    id={msgId}
    values={{ p: (paragraf: string) => (<p>{paragraf}</p>)}}
  />
);

export default FormattedMsgMedParagrafer;
