import { FormattedMessage, useIntl } from "react-intl";
import React, { ReactNode, useEffect } from "react";

import { EtikettLiten, Sidetittel, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelData } from "../../types/lenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";

export type ForsideMedLenkerBaseProps = {
  tittel: string,
  ingress: ReactNode,
  lenke?: Array<LenkepanelData>,
};

const cssPrefix = "forside-med-lenker";

const makeLenkepanel = (lenkeData: LenkepanelData) => (
  <LenkepanelBase
    href={lenkeData.url}
    border={true}
    key={lenkeData.tittel}
    className={`${cssPrefix}__lenkepanel`}
  >
    <div>
      <Systemtittel className={`${cssPrefix}__lenkepanel-header lenkepanel__heading`}>
        <FormattedMessage id={lenkeData.tittel}/>
      </Systemtittel>
      <Undertekst className={`${cssPrefix}__lenkepanel-ingress`}>
        {lenkeData.ingress}
      </Undertekst>
    </div>
  </LenkepanelBase>
);

const ForsideMedLenkerBase = ({tittel, ingress, lenke}: ForsideMedLenkerBaseProps) => {
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
        {ingress}
      </div>
      { lenke &&
        (
          <div className={`${cssPrefix}__lenker`}>
            {lenke.map(makeLenkepanel)}
          </div>
        )
      }
    </div>
  );
};

export default ForsideMedLenkerBase;
