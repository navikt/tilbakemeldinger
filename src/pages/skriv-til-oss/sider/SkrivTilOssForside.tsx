import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import AlertStripe from "nav-frontend-alertstriper";
import { useStore } from "../../../providers/Provider";

const lenker: LenkepanelData[] = [
  {
    grafanaId: "skrivtiloss.arbeidssoker",
    tittelId: "skrivtiloss.arbeidssoker.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.arbeidssoker.lenke.ingress"}/>,
    url: urls.skrivTilOss.arbeidssoker,
    external: true
  },
  {
    grafanaId: "skrivtiloss.syk",
    tittelId: "skrivtiloss.syk.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.syk.lenke.ingress"}/>,
    url: urls.skrivTilOss.syk,
    external: true
  },
  {
    grafanaId: "skrivtiloss.familieogbarn",
    tittelId: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: (
      <FormattedMessage id={"skrivtiloss.familieogbarn.lenke.ingress"}/>
    ),
    url: urls.skrivTilOss.familieogbarn,
    external: true
  },
  {
    grafanaId: "skrivtiloss.ufor",
    tittelId: "skrivtiloss.ufor.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.ufor.lenke.ingress"}/>,
    url: urls.skrivTilOss.ufor,
    external: true
  },
  {
    grafanaId: "skrivtiloss.pensjonist",
    tittelId: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.pensjonist.lenke.ingress"}/>,
    url: urls.skrivTilOss.pensjonist,
    external: true
  },
  {
    grafanaId: "skrivtiloss.hjelpemidler",
    tittelId: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"}/>,
    url: urls.skrivTilOss.hjelpemidler
  }
];

const Ingress = () => {
  const intl = useIntl();

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
        <FormattedMessage id="skrivtiloss.ingress"/>
      </Normaltekst>
    </>
  );
};

const StengtMelding = () => (
  <AlertStripe type="advarsel" className={'varsel-panel'}>
    <FormattedMessage id={"skrivtiloss.disabled"}/>
  </AlertStripe>
);

const SkrivTilOssForside = () => {
  const [{channelProps}] = useStore();

  const isClosed = channelProps.types.write.closed;

  return (
    <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenker={isClosed ? undefined : lenker}>
      <>
        {!isClosed && (
          <Normaltekst className={"svartid"}>
            <FormattedMessage id={"kontaktoss.svartid"}/>
            {channelProps.types.write.answer_time}
          </Normaltekst>
        )}
        <Ingress/>
        {isClosed && <StengtMelding/>}
      </>
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
