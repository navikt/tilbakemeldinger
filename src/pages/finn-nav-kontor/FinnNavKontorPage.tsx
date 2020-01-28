import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { FinnNavKontorResultat, FinnNavKontorResultatDynamisk } from "./FinnNavKontorResultat";
import IkonPanel from "../../components/ikonpanel/IkonPanel";
import { generateSearchResult, minQueryLength, SearchResult } from "./FinnNavKontorSok";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<SearchResult | null>();
  const [searchResultDynamic, setSearchResultDynamic] = useState<SearchResult | null>();

  return (
    <div className={`finn-kontor pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Form
          onSubmit={() => {
            inputElement && setSearchResult(generateSearchResult(inputElement.value));
            setSearchResultDynamic(null);
          }}
        >
          <Label htmlFor={"finn-kontor-input-id"}>
            <FormattedMessage id={"finnkontor.sok.label"}/>
          </Label>
          <div className={"finn-kontor__input-og-knapp"}>
            <Input
              id={"finn-kontor-input-id"}
              className={"finn-kontor__input"}
              type={"text"}
              autoFocus={true}
              autoComplete={"off"}
              onFocus={e => setInputElement(e.target)}
              onChange={e =>
                setSearchResultDynamic(generateSearchResult(e.target.value))
              }
            />
            <Knapp
              htmlType={"submit"}
              type={"standard"}
              className={"finn-kontor__knapp"}
              form={"kompakt"}
              mini={true}
            >
              <FormattedMessage id={"finnkontor.sok.knapp"}/>
            </Knapp>
          </div>

          {searchResultDynamic && searchResultDynamic.query.length >= minQueryLength && (
            <div className={"finn-kontor__preview-container"}>
              <FinnNavKontorResultatDynamisk resultat={searchResultDynamic}/>
            </div>
          )}
        </Form>

        {searchResult && (
          <div className={`finn-kontor__resultat-container`}>
            <FinnNavKontorResultat resultat={searchResult}/>
          </div>
        )}
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
