import React, { ReactNode, useEffect, useState } from "react";
import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import { vars } from "../../Config";
import { Features, getFeatureToggleStatusMultiple } from "../../utils/unleash";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";
import ForsideMedLenkerBase, { ForsideMedLenkerBaseProps } from "./ForsideMedLenkerBase";

const enabledName = vars.unleash.skrivTilOssEnabledName;
const svartidName = vars.unleash.langSvartidName;
const enabledDefault = vars.unleash.skrivTilOssEnabledDefault;
const svartidDefault = vars.unleash.langSvartidDefault;

type Props = ForsideMedLenkerBaseProps;

const ingressMedSvartid = (ingress: ReactNode, langSvartid: boolean) => (
  <>
    <Normaltekst>
      <FormattedMessage id={"skrivtiloss.svartid"} values={{numDager: vars.svartidDager}}/>
      {langSvartid && <FormattedMessage id={"skrivtiloss.svartid.lang"}/>}
    </Normaltekst>
    {ingress}
  </>
);

const SkrivTilOssBase = ({tittel, ingress, lenke}: Props) => {
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
        <FormattedMessage id={"skrivtiloss.disabled"}/>
      </AlertStripe>
    );
  }

  return(
    <ForsideMedLenkerBase
      tittel={tittel}
      ingress={ingressMedSvartid(ingress, langSvartid)}
      lenke={lenke}
    />
  );
};

export default SkrivTilOssBase;
