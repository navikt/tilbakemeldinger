import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import TemaLenkepanel from "../../components/lenkepanel/TemaLenkepanel";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Kanal, TemaLenke } from "../../types/kanaler";
import NavFrontendSpinner from "nav-frontend-spinner";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import { useStore } from "../../providers/Provider";
import { TjenesteStengtVarsel } from "../../components/varsler/tjeneste-stengt/TjenesteStengtVarsel";

const cssPrefix = "skriv-til-oss";

type Props = {
  tittelId: string;
  lenkepanelData?: TemaLenke[];
  children: JSX.Element;
};

const SkrivTilOssBase = ({ tittelId, lenkepanelData, children }: Props) => {
  const documentTitle = `${useIntl().formatMessage({
    id: tittelId
  })} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [{ channels }] = useStore();
  const stoProps = channels.props[Kanal.SkrivTilOss];
  const isClosed = stoProps.status && stoProps.status.closed;

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />
      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={tittelId} />
        </Sidetittel>
      </div>
      {channels.isLoaded ? (
        <>
          <div className={`${cssPrefix}__ingress`}>
            {children}
            <VarselVisning kanal={Kanal.SkrivTilOss}>
              {isClosed ? <TjenesteStengtVarsel /> : undefined}
            </VarselVisning>
          </div>
          {!isClosed && (
            <div className={`${cssPrefix}__lenke-seksjon`}>
              {lenkepanelData && lenkepanelData.map(lenke => (
                <TemaLenkepanel lenkepanelData={lenke} cssPrefix={cssPrefix} key={lenke.tema} />
              ))}
            </div>
          )}
        </>
      ) : <NavFrontendSpinner />}
    </div>
  );
};

export default SkrivTilOssBase;
