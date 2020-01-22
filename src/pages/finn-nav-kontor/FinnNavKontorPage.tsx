import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { KontorInfoSeksjon } from "./KontorInfoSeksjon";
import IkonPanel from "../../components/ikonpanel/IkonPanel";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const filterInputAndUpdatePostnr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toString();
    const nyttPostnr = !isNaN(Number(postnr)) ? input.replace(".", "") : postnr;
    setPostnr(nyttPostnr);
  };
  const [postnr, setPostnr] = useState("");

  const tittel = useIntl().formatMessage({
    id: "finnkontor.tittel"
  });
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Label htmlFor={"postnr-input"}>
          <FormattedMessage id={"finnkontor.skriv.postnr"}/>
        </Label>
        <div className={"kontor-info-content"}>
          <Input
            id={"postnr-input"}
            bredde={"XS"}
            maxLength={4}
            type={"text"}
            value={postnr}
            onChange={filterInputAndUpdatePostnr}
          />

          { postnr && postnr.length === 4 && (
            <div className={"kontor-info-result"}>
              <KontorInfoSeksjon
                postnr={postnr}
              />
            </div>
          )}
        </div>
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
