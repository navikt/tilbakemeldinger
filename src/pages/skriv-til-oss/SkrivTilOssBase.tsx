import React, { ReactNode, useEffect, useState } from "react";
import { EtikettLiten, Normaltekst, Sidetittel, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelData } from "../../types/lenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { useIntl, FormattedMessage } from "react-intl";
import { vars } from "../../Config";
import { Features, getFeatureToggleStatusMultiple } from "../../utils/unleash";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";

const enabledName = vars.unleash.skrivTilOssEnabledName;
const svartidName = vars.unleash.langSvartidName;
const enabledDefault = vars.unleash.skrivTilOssEnabledDefault;
const svartidDefault = vars.unleash.langSvartidDefault;

type SkrivTilOssBaseProps = {
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

const SkrivTilOssBase = ({tittel, ingress, lenker}: SkrivTilOssBaseProps) => {
  const documentTitle = `${useIntl().formatMessage({id: tittel})} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [unleashResponded, setUnleashResponded] = useState(false);
  const [langSvartid, setLangSvartid] = useState(svartidDefault);
  const [skrivTilOssEnabled, setSkrivTilOssEnabled] = useState(enabledDefault);

  const unleashTogglesResponse = (unleashToggles: Features, error: any) => {
    setUnleashResponded(true);
    if (error) {
      console.log(`Unleash error: ${error}`);
      return;
    }

    setLangSvartid(unleashToggles[svartidName]);
    setSkrivTilOssEnabled(unleashToggles[enabledName]);
  };

  useEffect(() => {
    getFeatureToggleStatusMultiple(
      [svartidName, enabledName],
      unleashTogglesResponse);
  }, []);

  if (!unleashResponded) {
    return(<NavFrontendSpinner negativ={true} />);
  }

  if (!skrivTilOssEnabled) {
    return(
      <AlertStripe type="advarsel">
        {"Tjenesten er dessverre ikke tilgjengelig."}
      </AlertStripe>
    );
  }

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
        <Normaltekst className="skriv-til-oss__svartid">
          <FormattedMessage id={"skrivtiloss.svartid"} values={{numDager: vars.svartidDager}}/>
          {langSvartid ? <FormattedMessage id={"skrivtiloss.svartid.lang"}/> : null}
        </Normaltekst>
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
