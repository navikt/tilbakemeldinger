import { Normaltekst } from "nav-frontend-typografi";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import React from "react";

type Props = {
  msgId: string,
  cssPrefix: string,
};

const ChatEkspandertPanelInnhold = ({msgId, cssPrefix}: Props) => {
  return(
    <div className={`${cssPrefix}__panel-innhold`}>
      <Normaltekst>
        <FormattedMsgMedParagrafer msgId={msgId} Component={Normaltekst}/>
      </Normaltekst>
      <div className={`${cssPrefix}__panel-start-knapp`}>
        <Hovedknapp>
          <FormattedMessage id={"chat.startknapp"}/>
        </Hovedknapp>
      </div>
    </div>
  );
};

export default ChatEkspandertPanelInnhold;
