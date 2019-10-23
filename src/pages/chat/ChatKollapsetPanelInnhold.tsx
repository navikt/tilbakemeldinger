import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  msgId: string,
  cssPrefix: string,
};

const ChatKollapsetPanelInnhold = ({msgId, cssPrefix}: Props) => (
  <div className={`${cssPrefix}__panel-innhold`}>
    <Normaltekst>
      <FormattedMessage id={msgId}/>
    </Normaltekst>
  </div>
);

export default ChatKollapsetPanelInnhold;
