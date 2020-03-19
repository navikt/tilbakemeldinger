import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { KoronaVirusVarsel } from "../../components/varsler/korona-virus-varsel/KoronaVirusVarsel";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";
import { TemaLenke } from "../../types/kanaler";

const cssPrefix = "skriv-til-oss";

type Props = {
  tittel: string;
  children: JSX.Element;
  lenkepanelData?: TemaLenke[];
};

const SkrivTilOssBase = ({ tittel, children, lenkepanelData }: Props) => {
  const documentTitle = `${useIntl().formatMessage({
    id: tittel
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />
      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={tittel} />
        </Sidetittel>
      </div>
      <div className={`${cssPrefix}__ingress`}>
        {children}
        <KoronaVirusVarsel />
        <StorPaagangVarsel />
      </div>
      {lenkepanelData && (
        <div className={`${cssPrefix}__lenke-seksjon`}>
          {lenkepanelData.map(lenke => (
            <TemaLenkepanel lenkepanelData={lenke} cssPrefix={cssPrefix} key={lenke.tema} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkrivTilOssBase;
