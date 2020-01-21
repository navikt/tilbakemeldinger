import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";

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

    </div>
  );
};

export default FinnNavKontorPage;
