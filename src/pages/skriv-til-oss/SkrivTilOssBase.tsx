import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { KoronaVirusVarsel } from "../../components/varsler/korona-virus-varsel/KoronaVirusVarsel";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import { TemaLenke } from "../../types/kanaler";
import NavFrontendSpinner from "nav-frontend-spinner";

const cssPrefix = "skriv-til-oss";

type Props = {
  tittelId: string;
  isLoaded?: boolean;
  lenkepanelData?: TemaLenke[];
  children: JSX.Element;
};

const SkrivTilOssBase = ({ tittelId, isLoaded, lenkepanelData, children }: Props) => {
  const documentTitle = `${useIntl().formatMessage({
    id: tittelId
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />
      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={tittelId} />
        </Sidetittel>
      </div>
      {isLoaded ? (
        <>
          <div className={`${cssPrefix}__ingress`}>
            {children}
            <KoronaVirusVarsel />
            <StorPaagangVarsel />
          </div>
          <div className={`${cssPrefix}__lenke-seksjon`}>
            {lenkepanelData && lenkepanelData.map(lenke => (
              <TemaLenkepanel lenkepanelData={lenke} cssPrefix={cssPrefix} key={lenke.tema} />
            ))}
          </div>
        </>
      ) : <NavFrontendSpinner />}
    </div>
  );
};

export default SkrivTilOssBase;
