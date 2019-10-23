import { Normaltekst } from "nav-frontend-typografi";
import FormattedMsgMedParagrafer from "../../components/formattedMsgMedParagrafer/FormattedMsgMedParagrafer";
import React from "react";

type Props = {
  msgId: string,
  cssPrefix: string,
};

const ChatKollapsetPanelInnhold = ({msgId, cssPrefix}: Props) => (
  <div className={`${cssPrefix}__panel-innhold`}>
    <Normaltekst>
      <FormattedMsgMedParagrafer msgId={msgId}/>
    </Normaltekst>
  </div>
);

export default ChatKollapsetPanelInnhold;
