import React, {useEffect, useState} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { FinnNavKontorSokResultatVisning } from "./FinnNavKontorSokResultatVisning";
import IkonPanel from "../../components/ikonpanel/IkonPanel";
import {generateSearchResult} from "./FinnNavKontorSok";
import {Form} from "calidation";
import {Knapp} from "nav-frontend-knapper";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryOnSubmit, setSearchQueryOnSubmit] = useState("");
  const [searchResult, setSearchResult] = useState();

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper/>
      <IkonPanel tittel={tittel}>
        <Form onSubmit={() => {
          setSearchQueryOnSubmit(searchQuery);
          generateSearchResult(searchQuery, setSearchResult);
        }}>
          <Label htmlFor={"postnr-input"}>
            <FormattedMessage id={"finnkontor.sok.label"}/>
          </Label>
          <Input
            id={"finn-kontor-input"}
            bredde={"M"}
            type={"text"}
            autoFocus={true}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Knapp htmlType={"submit"} type={"standard"} className={`${cssPrefix}__knapp`}>
            {"Søk"}
          </Knapp>
        </Form>

        { searchQueryOnSubmit &&
          <div className={`${cssPrefix}__resultat`}>
              <FinnNavKontorSokResultatVisning
                result={searchResult}
                query={searchQueryOnSubmit}
              />
          </div>
        }
      </IkonPanel>
    </div>
  );
};

export default FinnNavKontorPage;
