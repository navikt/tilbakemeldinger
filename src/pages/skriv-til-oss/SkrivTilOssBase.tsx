import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import { LenkepanelData } from "../../types/lenker";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { AlertStripeInfo } from "nav-frontend-alertstriper";
import { visApningstiderJul } from "../../Config";
import TidsbestemtVisning from "../../utils/TidsbestemtVisning";

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

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />
      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={tittel} />
        </Sidetittel>
      </div>
      <div className={`${cssPrefix}__ingress`}>
        {children}
      </div>
      <TidsbestemtVisning fra={visApningstiderJul.fraDato} til={visApningstiderJul.tilDato}>
        <AlertStripeInfo className={`${cssPrefix}__varsel`}>
          <FormattedMessage id="apningstid.avvik.skrivtiloss" />
        </AlertStripeInfo>
      </TidsbestemtVisning>
      {lenker && (
        <div className={`${cssPrefix}__lenke-seksjon`}>
          {lenker.map(lenke => (
            <TemaLenkepanel lenkePanelData={lenke} cssPrefix={cssPrefix} key={lenke.tittelId} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkrivTilOssBase;
