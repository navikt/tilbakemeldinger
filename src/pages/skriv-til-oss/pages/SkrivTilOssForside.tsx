import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

const Ingress = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags>
        <title>{intl.messages["feilogmangler.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["skrivtiloss.description"] as string}
        />
      </MetaTags>
      <Normaltekst className="skriv-til-oss__infotekst">
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
  },
  {
    tittel: "skrivtiloss.syk.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.syk.lenke.ingress"} />,
    url: urls.skrivTilOss.syk,
  },
  {
    tittel: "skrivtiloss.familieogbarn.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.familieogbarn.lenke.ingress"} />,
    url: urls.skrivTilOss.familieogbarn,
  },
  {
    tittel: "skrivtiloss.pensjonist.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.pensjonist.lenke.ingress"} />,
    url: urls.skrivTilOss.pensjonist,
  },
  {
    tittel: "skrivtiloss.ufor.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.ufor.lenke.ingress"} />,
    url: urls.skrivTilOss.ufor,
  },
  {
    tittel: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"} />,
    url: urls.skrivTilOss.hjelpemidler,
  },
  {
    tittel: "skrivtiloss.sosial.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.sosial.lenke.ingress"} />,
    url: urls.skrivTilOss.sosial,
  },
];

const SkrivTilOssForside = () => (
  <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default SkrivTilOssForside;
