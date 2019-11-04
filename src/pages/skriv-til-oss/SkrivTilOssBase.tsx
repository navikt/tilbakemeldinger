import React, { useEffect, useState } from "react";
import { EtikettLiten, Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { vars } from "../../Config";
import { Features, getFeatureToggleStatusMultiple } from "../../utils/unleash";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";
import { LenkepanelData } from "../../types/lenker";
import SkrivTilOssLenkepanel from "./SkrivTilOssLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";

const enabledName = vars.unleash.skrivTilOssEnabledName;
const svartidName = vars.unleash.langSvartidName;
const enabledDefault = vars.unleash.skrivTilOssEnabledDefault;
const svartidDefault = vars.unleash.langSvartidDefault;

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
      unleashTogglesResponse
    );
  }, []);

  if (!unleashResponded) {
    return <NavFrontendSpinner negativ={true} />;
  }

  if (!skrivTilOssEnabled) {
    return (
      <AlertStripe type="advarsel">
        <FormattedMessage id={"skrivtiloss.disabled"} />
      </AlertStripe>
    );
  }

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />
      <div className={`${cssPrefix}__header`}>
        <EtikettLiten>
          <FormattedMessage id={"header.navperson"} />
        </EtikettLiten>
        <Sidetittel>
          <FormattedMessage id={tittel} />
        </Sidetittel>
      </div>
      <div className={`${cssPrefix}__ingress`}>
        <Normaltekst className={`${cssPrefix}__svartid`}>
          <FormattedMessage
            id={"skrivtiloss.svartid"}
            values={{ numDager: vars.svartidDager }}
          />
          {langSvartid && <FormattedMessage id={"skrivtiloss.svartid.lang"} />}
        </Normaltekst>
        {children}
      </div>
      {lenker && (
        <div className={`${cssPrefix}__lenker`}>
          {lenker.map(lenke => (
            <SkrivTilOssLenkepanel lenkePanelData={lenke} key={lenke.tittel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkrivTilOssBase;
