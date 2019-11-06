import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls, vars } from "../../../Config";
import { Features, getFeatureToggleStatusMultiple } from "../../../utils/unleash";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";

const svartidName = vars.unleash.langSvartidName;
const svartidDefault = vars.unleash.langSvartidDefault;
const enabledName = vars.unleash.skrivTilOssEnabledName;
const enabledDefault = vars.unleash.skrivTilOssEnabledDefault;

const Ingress = () => {
  const intl = useIntl();

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
    <>
      <MetaTags>
        <title>{intl.messages["skrivtiloss.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["skrivtiloss.description"] as string}
        />
      </MetaTags>
      <Normaltekst>
        <FormattedMessage
          id={"skrivtiloss.svartid"}
          values={{ numDager: vars.svartidDager }}
        />
        {langSvartid && <FormattedMessage id={"skrivtiloss.svartid.lang"} />}
      </Normaltekst>
      <Normaltekst>
        <FormattedMessage id="skrivtiloss.ingress" />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.arbeidssoker.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.arbeidssoker.lenke.ingress"} />,
    url: urls.skrivTilOss.arbeidssoker,
    external: true,
  },
  {
    tittel: "skrivtiloss.syk.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.syk.lenke.ingress"} />,
    url: urls.skrivTilOss.syk,
    external: true,
  },
  {
    tittel: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.familieogbarn.lenke.ingress"} />,
    url: urls.skrivTilOss.familieogbarn,
    external: true,
  },
  {
    tittel: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.pensjonist.lenke.ingress"} />,
    url: urls.skrivTilOss.pensjonist,
    external: true,
  },
  {
    tittel: "skrivtiloss.ufor.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.ufor.lenke.ingress"} />,
    url: urls.skrivTilOss.ufor,
    external: true,
  },
  {
    tittel: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"} />,
    url: urls.skrivTilOss.hjelpemidler,
  },
  // {
  //   tittel: "skrivtiloss.sosial.lenke.tittel",
  //   ingress: <FormattedMessage id={"skrivtiloss.sosial.lenke.ingress"} />,
  //   url: urls.skrivTilOss.sosial,
  //   external: true,
  // }
];

const SkrivTilOssForside = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default SkrivTilOssForside;
