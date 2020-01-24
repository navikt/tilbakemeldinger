import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { FinnNavKontorResultat } from "./FinnNavKontorResultat";
import IkonPanel from "../../components/ikonpanel/IkonPanel";
import { generateSearchResult, minQueryLength, SearchResult, SearchStatus } from "./FinnNavKontorSok";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";
import { FinnNavKontorPreview } from "./FinnNavKontorPreview";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [searchResult, setSearchResult] = useState<SearchResult>();
  const [searchPreview, setSearchPreview] = useState<SearchResult | null>();

  return (
    <div className={`finn-kontor pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Form onSubmit={() => {
          inputElement && setSearchResult(generateSearchResult(inputElement.value));
          setSearchPreview(null);
        }}>
          <Label htmlFor={"finn-kontor-input"}>
            <FormattedMessage id={"finnkontor.sok.label"}/>
          </Label>
          <Input
            id={"finn-kontor-input"}
            bredde={"M"}
            type={"text"}
            autoFocus={true}
            autoComplete={"off"}
            onFocus={e => setInputElement(e.target)}
            onChange={e =>
              setSearchPreview(e.target.value.length >= minQueryLength ? generateSearchResult(e.target.value) : null)
            }
          />
          <Knapp
            htmlType={"submit"}
            type={"standard"}
            className={`finn-kontor__knapp`}
          >
            {"Søk"}
          </Knapp>
          { searchPreview &&
          (searchPreview.status === SearchStatus.stedsnavnTreff || searchPreview.status === SearchStatus.ingenTreff) && (
            <div className={"finn-kontor__preview"}>
              <FinnNavKontorPreview resultat={searchPreview}/>
            </div>
          )}
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
