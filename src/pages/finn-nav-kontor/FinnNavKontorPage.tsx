import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { FinnNavKontorResultat } from "./FinnNavKontorResultat";
import IkonPanel from "../../components/ikonpanel/IkonPanel";
import { generateSearchResult, SearchResult } from "./FinnNavKontorSok";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<SearchResult>();

  return (
    <div className={`finn-kontor pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Form onSubmit={() => inputElement && setSearchResult(generateSearchResult(inputElement.value))}>
          <Label htmlFor={"finn-kontor-input"}>
            <FormattedMessage id={"finnkontor.sok.label"}/>
          </Label>
          <Input
            id={"finn-kontor-input"}
            bredde={"M"}
            type={"text"}
            autoFocus={true}
            onFocus={e => setInputElement(e.target)}
          />
          <Knapp
            htmlType={"submit"}
            type={"standard"}
            className={`finn-kontor__knapp`}
          >
            {"Søk"}
          </Knapp>
        </Form>

        {searchResult && (
          <div className={`finn-kontor__resultat`}>
            <FinnNavKontorResultat resultat={searchResult}/>
          </div>
        )}
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
