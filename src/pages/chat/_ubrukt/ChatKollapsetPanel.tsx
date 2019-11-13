import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";

type Props = {
  msgId: string,
  cssPrefix: string,
};

const ChatKollapsetPanel = ({msgId, cssPrefix}: Props) => (
  <div className={`${cssPrefix}__panel-innhold`}>
    <FormattedMsgMedParagrafer id={msgId} Component={Normaltekst}/>
  </div>
);

export default ChatKollapsetPanel;
