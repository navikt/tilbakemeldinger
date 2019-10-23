import { Normaltekst } from "nav-frontend-typografi";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import React from "react";

type Props = {
  msgId: string,
  cssPrefix: string,
};

const ChatKollapsetPanelInnhold = ({msgId, cssPrefix}: Props) => (
  <div className={`${cssPrefix}__panel-innhold`}>
    <Normaltekst>
      <FormattedMsgMedParagrafer msgId={msgId} Component={Normaltekst}/>
    </Normaltekst>
  </div>
);

export default ChatKollapsetPanelInnhold;
