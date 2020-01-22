import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input } from "nav-frontend-skjema";
import { KontorInfoSeksjon } from "./KontorInfoSeksjon";
import IkonPanel from "../../components/ikonpanel/IkonPanel";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const updatePostnr = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <Input
          label={"Skriv inn postnummer"}
          bredde={"XS"}
          maxLength={4}
          type={"text"}
          value={postnr}
          onChange={updatePostnr}
        />

        { postnr && postnr.length === 4 && (
          <KontorInfoSeksjon
            className={"kontor-info"}
            postnr={postnr}
          />
        )}
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
