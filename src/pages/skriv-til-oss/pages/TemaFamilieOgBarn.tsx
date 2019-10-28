import React from "react";
import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { vars, urls } from "../../../Config";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

const Ingress = () => {
  const intl = useIntl();
  return (
    <>
      <MetaTags>
        <title>{intl.messages["familieogbarn.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["familieogbarn.description"] as string}
        />
      </MetaTags>
      <Normaltekst className="skriv-til-oss__infotekst">
        <FormattedMessage id={"familieogbarn.infotekst"} />
      </Normaltekst>
    </>
  );
};

const lenker: LenkepanelData[] = [
  {
    tittel: "skrivtiloss.temalenke.chat.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.chat.ingress"} />,
    url: urls.temaFamilieOgBarn.chat,
    external: false
  },
  {
    tittel: "skrivtiloss.temalenke.facebook.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.temalenke.facebook.ingress"} />,
    url: urls.facebook,
    external: true
  },
  {
    tittel: "familieogbarn.lenke.skrivtiloss.tittel",
    ingress: (
      <FormattedMessage
        id={"familieogbarn.lenke.skrivtiloss.ingress"}
        values={{ numDager: vars.svartidDager }}
      />
    ),
    url: urls.temaFamilieOgBarn.skrivtiloss,
    external: false
  }
];

const TemaFamilieOgBarn = () => (
  <SkrivTilOssBase tittel={"familieogbarn.tittel"} lenker={lenker}>
    <Ingress />
  </SkrivTilOssBase>
);

export default TemaFamilieOgBarn;
