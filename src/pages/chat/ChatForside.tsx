import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Sidetittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/topp-linje/ToppLinje";
import { useStore } from "../../providers/Provider";
import { Kanal, TemaLenke } from "../../types/kanaler";
import { chatTemaLenker } from "./data/chatTemaLenker";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { Varsel } from "../../components/varsler/Varsel";

const cssPrefix = "chat-med-oss";
const sideTittelId = "chat.forside.tittel";

const ChatForside = () => {
  const documentTitle = `${useIntl().formatMessage({ id: sideTittelId })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [{ channels }] = useStore();
  const chatProps = channels.props[Kanal.Chat];
  const isClosed = chatProps.status && chatProps.status.closed;
  const closedMsg = chatProps.status && chatProps.status.message;

  return (
    <>
      <div className={`${cssPrefix} pagecontent`}>
        <BreadcrumbsWrapper />
        <div className={`${cssPrefix}__header`}>
          <Sidetittel>
            <FormattedMessage id={sideTittelId} />
          </Sidetittel>
        </div>
        <div className={`${cssPrefix}__ingress`}>
          {channels.isLoaded
            ? <LocaleBlockContent localeBlock={chatProps.preamble} />
            : <NavContentLoader lines={1} />}
          <VarselVisning kanal={Kanal.Chat}>
            <>
              {isClosed && (
                <Varsel type={"info"}>
                  <LocaleBlockContent localeBlock={closedMsg} />
                </Varsel>
              )}
            </>
          </VarselVisning>
        </div>
        <div className={`${cssPrefix}__temapanel-seksjon`}>
          {chatTemaLenker.map((lenke: TemaLenke) => (
            <TemaLenkepanel
              lenkepanelData={lenke}
              cssPrefix={cssPrefix}
              key={lenke.url}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatForside;
