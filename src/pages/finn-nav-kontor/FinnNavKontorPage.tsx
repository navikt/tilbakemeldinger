import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import RouterLenke from "../../components/routerlenke/RouterLenkeMedChevron";
import { urls } from "../../Config";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({
    id: "kontaktoss.navkontor.uinnlogget.lenke"
  });
  const documentTitle = `${tittel} - www.nav.no`;
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
      <RouterLenke
        href={urls.finnDittNavKontorUinnlogget}
        isExternal={true}
      >
        <FormattedMessage id="kontaktoss.navkontor.xls.lenke" />
      </RouterLenke>
    </div>
  );
};

export default FinnNavKontorPage;
