import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls, vars } from "../../../Config";
import Unleash from "../../../utils/unleash";
import NavFrontendSpinner from "nav-frontend-spinner";
import AlertStripe from "nav-frontend-alertstriper";

const svartidName = vars.unleash.langSvartidName;
const enabledName = vars.unleash.skrivTilOssEnabledName;
const enabledDefault = vars.unleash.skrivTilOssEnabledDefault;

// TODO: Unleash toggle skal skjule lenker

const Ingress = () => {
  const intl = useIntl();

  const [unleashResponded, setUnleashResponded] = useState(false);
  const [skrivTilOssEnabled, setSkrivTilOssEnabled] = useState(enabledDefault);

  useEffect(() => {
    Unleash.getFeatureToggleStatusMultiple(
      [svartidName, enabledName],
      (unleashToggles, error) => {
        setUnleashResponded(true);
        if (error) {
          console.log(`Unleash error: ${error}`);
          return;
        }

        setSkrivTilOssEnabled(unleashToggles[enabledName]);
      }
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
        <FormattedMessage id="skrivtiloss.ingress" />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    grafanaId: "skrivtiloss.arbeidssoker",
    tittelId: "skrivtiloss.arbeidssoker.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.arbeidssoker.lenke.ingress"} />,
    url: urls.skrivTilOss.arbeidssoker,
    external: true
  },
  {
    grafanaId: "skrivtiloss.syk",
    tittelId: "skrivtiloss.syk.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.syk.lenke.ingress"} />,
    url: urls.skrivTilOss.syk,
    external: true
  },
  {
    grafanaId: "skrivtiloss.familieogbarn",
    tittelId: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: (
      <FormattedMessage id={"skrivtiloss.familieogbarn.lenke.ingress"} />
    ),
    url: urls.skrivTilOss.familieogbarn,
    external: true
  },
  {
    grafanaId: "skrivtiloss.pensjonist",
    tittelId: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.pensjonist.lenke.ingress"} />,
    url: urls.skrivTilOss.pensjonist,
    external: true
  },
  {
    grafanaId: "skrivtiloss.ufor",
    tittelId: "skrivtiloss.ufor.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.ufor.lenke.ingress"} />,
    url: urls.skrivTilOss.ufor,
    external: true
  },
  {
    grafanaId: "skrivtiloss.hjelpemidler",
    tittelId: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"} />,
    url: urls.skrivTilOss.hjelpemidler
  }
];

const SkrivTilOssForside = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default SkrivTilOssForside;
