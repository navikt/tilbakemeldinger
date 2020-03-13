import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { LenkepanelData } from "../../types/lenker";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { KoronaVirusVarsel } from "../../components/varsler/korona-virus-varsel/KoronaVirusVarsel";
import { StorPaagangVarsel } from "../../components/varsler/stor-paagang-varsel/StorPaagangVarsel";

const cssPrefix = "skriv-til-oss";

type Props = {
  tittel: string;
  children: JSX.Element;
  lenker?: Array<LenkepanelData>;
};

const SkrivTilOssBase = ({ tittel, children, lenker }: Props) => {
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
      {lenker && (
        <div className={`${cssPrefix}__lenke-seksjon`}>
          {lenker.map(lenke => (
            <TemaLenkepanel lenkePanelData={lenke} cssPrefix={cssPrefix} key={lenke.tittelId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkrivTilOssBase;
