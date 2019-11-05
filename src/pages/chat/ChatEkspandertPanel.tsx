import { Normaltekst } from "nav-frontend-typografi";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import React from "react";
import { ChatTema } from "../../types/chat";

export type ButtonClickHandler = (buttonId: ChatTema) => void;

type Props = {
  msgId: string,
  cssPrefix: string,
  temaKode: ChatTema,
  buttonClickHandler: ButtonClickHandler,
};

const personvernMsgId = "chat.advarsel.personvern";

const ChatEkspandertPanel = ({msgId, cssPrefix, temaKode, buttonClickHandler}: Props) => {
  return(
    <div className={`${cssPrefix}__panel-innhold`}>
      <FormattedMsgMedParagrafer id={msgId} Component={Normaltekst}/>
      <FormattedMsgMedParagrafer id={personvernMsgId} Component={Normaltekst}/>
      <div className={`${cssPrefix}__panel-start-knapp`}>
        <Hovedknapp
          htmlType={"button"}
          onClick={() => { buttonClickHandler(temaKode); }}
        >
          <FormattedMessage id={"chat.startknapp"}/>
        </Hovedknapp>
      </div>
    </div>
  );
};

export default ChatEkspandertPanel;
