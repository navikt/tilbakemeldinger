import React, { useEffect } from "react";
import { EtikettLiten, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { Hovedknapp } from "nav-frontend-knapper";

type ChatBaseProps = {
  tittel: string,
  ingress: string,
  lenke: string
};

const cssPrefix = "chat-tema";

const ChatTemaBase = ({tittel, ingress, lenke}: ChatBaseProps) => {
  const documentTitle = `${useIntl().formatMessage({id: tittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return(
    <div className={`${cssPrefix} pagecontent`}>
      <div className={`${cssPrefix}__header`}>
        <EtikettLiten>
          <FormattedMessage id={"header.navperson"}/>
        </EtikettLiten>
        <Sidetittel>
          <FormattedMessage id={tittel}/>
        </Sidetittel>
      </div>
      <div className={`${cssPrefix}__ingress`}>
        <FormattedMessage
          id={ingress}
          values={{
            p: (paragraf: string) => (<Normaltekst>{paragraf}</Normaltekst>)
          }}
        />
      </div>
      <div className={`${cssPrefix}__start-knapp`}>
        <Hovedknapp>
          <FormattedMessage id={"chat.startknapp"}/>
        </Hovedknapp>
      </div>
    </div>
  );
};

export default ChatTemaBase;
