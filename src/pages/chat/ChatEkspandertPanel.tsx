import { Normaltekst } from "nav-frontend-typografi";
import FormattedMsgMedParagrafer from "../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { Hovedknapp } from "nav-frontend-knapper";
import { FormattedMessage } from "react-intl";
import React from "react";
import { ChatTema } from "../../types/chat";

type Props = {
  msgIds: Array<string>,
  cssPrefix: string,
  temaKode: ChatTema,
  buttonClickHandler: Function,
};

const ChatEkspandertPanel = ({msgIds, cssPrefix, temaKode, buttonClickHandler}: Props) => {
  return(
    <div className={`${cssPrefix}__panel-innhold`}>
      {msgIds.map((msgId: string) => <FormattedMsgMedParagrafer id={msgId} Component={Normaltekst} key={msgId}/>)}
      <div className={`${cssPrefix}__panel-start-knapp`}>
        <Hovedknapp
          htmlType={"button"}
          onClick={() => buttonClickHandler(temaKode)}
        >
          <FormattedMessage id={"chat.startknapp"}/>
        </Hovedknapp>
      </div>
    </div>
  );
};

export default ChatEkspandertPanel;
