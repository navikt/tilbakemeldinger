import React, { ReactNode } from "react";
import { EtikettLiten, Sidetittel, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelData } from "../../types/lenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { useIntl, FormattedMessage } from "react-intl";

type SkrivTilOssProps = {
  tittel: string,
  ingress: ReactNode,
  lenker?: Array<LenkepanelData>,
};

const makeLenkepanel = (lenkeData: LenkepanelData) => (
  <LenkepanelBase
    href={lenkeData.url}
    border={true}
    key={lenkeData.tittel}
    className="skriv-til-oss__temalenke"
  >
    <div>
      {lenkeData.ikon ? <div>{lenkeData.ikon}</div> : null}
      <div>
        <Systemtittel className="skriv-til-oss__temalenke-header lenkepanel__heading">
          <FormattedMessage id={lenkeData.tittel}/>
        </Systemtittel>
        <Undertekst className="skriv-til-oss__temalenke-ingress">
          {lenkeData.ingress}
        </Undertekst>
      </div>
    </div>
  </LenkepanelBase>
);

const SkrivTilOssBase = ({tittel, ingress, lenker}: SkrivTilOssProps) => {
  document.title = `${useIntl().formatMessage({id: tittel})} - www.nav.no`;

  return(
    <div className="skriv-til-oss pagecontent">
      <div className="skriv-til-oss__header">
        <EtikettLiten>
          {"NAV privatperson"}
        </EtikettLiten>
        <Sidetittel>
          <FormattedMessage id={tittel}/>
        </Sidetittel>
      </div>
      <div className="skriv-til-oss__ingress">
        {ingress}
      </div>
      { lenker ?
        (
          <div className="skriv-til-oss__lenker">
          {lenker.map(makeLenkepanel)}
        </div>
        )
        : null
      }
    </div>
  );
};

export default SkrivTilOssBase;
