import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import chatTemaLenker from "../ChatLenkepanelData";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../../components/breadcrumbs/BreadcrumbsWrapper";
import TemaLenkepanel from "../../../components/lenkepanel/TemaLenkepanel";
import { LenkepanelData } from "../../../types/lenker";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import TidsbestemtVisning from "../../../utils/TidsbestemtVisning";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const documentTitle = `${useIntl().formatMessage({id: sideTittelId})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return(
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittelId}/>
          </Sidetittel>
        </div>
        <TidsbestemtVisning fra={"11:00 04-03-2020"} til={"13:30 04-03-2020"}>
          <AlertStripeAdvarsel className={`${cssPrefix}__chat-stengt-alert`}>
            {"Chat er stengt fra kl. 12:15 til 13:30 på grunn av møte."}
          </AlertStripeAdvarsel>
        </TidsbestemtVisning>
        <div className={`${cssPrefix}__ingress`}>
          <Normaltekst>
            <FormattedMessage id="chat.forside.ingress"/>
          </Normaltekst>
        </div>
        <div className={`${cssPrefix}__temapanel-seksjon`}>
          {
            chatTemaLenker.map((lenkePanelData: LenkepanelData) => (
              <TemaLenkepanel
                lenkePanelData={lenkePanelData}
                cssPrefix={cssPrefix}
                key={lenkePanelData.url}
              />
            ))
          }
        </div>
      </div>
    </>
  );
};

export default ChatForside;
