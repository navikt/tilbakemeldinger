import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

import SkrivTilOssBase from "../SkrivTilOssBase";
import { LenkepanelData } from "types/lenker";
import { Normaltekst } from "nav-frontend-typografi";
import { urls } from "../../../Config";
import AlertStripe from "nav-frontend-alertstriper";
import { useStore } from "../../../providers/Provider";
import { Language, serializers, TextBlock } from "../../../utils/sanity/serializers";
import NavFrontendSpinner from "nav-frontend-spinner";
import { TekniskProblemBackend } from "../../../components/varsler/teknisk-problem-backend/TekniskProblemBackend";
import BlockContent from "@sanity/block-content-to-react";

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
    grafanaId: "skrivtiloss.ufor",
    tittelId: "skrivtiloss.ufor.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.ufor.lenke.ingress"} />,
    url: urls.skrivTilOss.ufor,
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
    grafanaId: "skrivtiloss.hjelpemidler",
    tittelId: "skrivtiloss.hjelpemidler.lenke.tittel",
    ingress: <FormattedMessage id={"skrivtiloss.hjelpemidler.lenke.ingress"} />,
    url: urls.skrivTilOss.hjelpemidler
  }
];

const Ingress = ({tekst}: {tekst: TextBlock[] | undefined}) => {
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
        <BlockContent blocks={tekst} serializers={serializers}/>
        {/*<FormattedMessage id="skrivtiloss.ingress" />*/}
      </Normaltekst>
    </>
  );
};

const StengtMelding = () => (
  <AlertStripe type="advarsel" className={'varsel-panel'}>
    <FormattedMessage id={"skrivtiloss.disabled"} />
  </AlertStripe>
);

const SkrivTilOssForside = () => {
  const [{ channelProps, visTekniskFeilMelding }, dispatch] = useStore();
  const stoProps = channelProps.types.write;

  if (!stoProps) {
    !visTekniskFeilMelding && dispatch({type: "SETT_TEKNISK_FEILMELDING"});
  }

  const isClosed = stoProps && stoProps.closed;
  const svartid = stoProps && stoProps.answer_time;
  const tekstBlokk = stoProps && stoProps.description;

  return (
    <SkrivTilOssBase tittel={"skrivtiloss.tittel"} lenker={isClosed ? undefined : lenker}>
      {channelProps.isLoaded ? (
        <>
          {!isClosed && (
            <Normaltekst className={"svartid"}>
              <FormattedMessage id={"kontaktoss.svartid"} />
              {svartid && svartid[Language.Bokmaal]}
            </Normaltekst>
          )}
          <Ingress tekst={tekstBlokk} />
          {visTekniskFeilMelding && <TekniskProblemBackend/>}
          {isClosed && <StengtMelding />}

        </>
      ) : <NavFrontendSpinner />}
    </SkrivTilOssBase>
  );
};

export default SkrivTilOssForside;
