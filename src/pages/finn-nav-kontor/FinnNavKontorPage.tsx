import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { KontorInfoSeksjon } from "./KontorInfoSeksjon";
import IkonPanel from "../../components/ikonpanel/IkonPanel";

const postnrTilEnhetsnr = require("./postnr-til-enhetsnr.json");

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const filterInputAndUpdatePostnr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toString();
    const nyttPostnr = !isNaN(Number(input))
        ? input
            .replace(".", "")
            .replace("-", "")
        : postnr;
    setPostnr(nyttPostnr);
  };
  const [postnr, setPostnr] = useState("");

  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const postnrFormatIsValid = postnr && postnr.length === 4;
  const postnrUtenLedendeNull = parseInt(postnr, 10).toString();
  const postnrIsValid = postnrFormatIsValid && postnrTilEnhetsnr[postnrUtenLedendeNull];

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Label htmlFor={"postnr-input"}>
          <FormattedMessage id={"finnkontor.skriv.postnr"}/>
        </Label>
        <Input
          id={"postnr-input"}
          bredde={"XS"}
          maxLength={4}
          type={"text"}
          value={postnr}
          onChange={filterInputAndUpdatePostnr}
          autoFocus={true}
          className={postnrFormatIsValid && !postnrIsValid ? "postnr-input-feil" : ""}
        />

        {postnrFormatIsValid && (
          <div className={"kontor-info-result"}>
            <KontorInfoSeksjon postnr={postnr}/>
          </div>
        )}
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
