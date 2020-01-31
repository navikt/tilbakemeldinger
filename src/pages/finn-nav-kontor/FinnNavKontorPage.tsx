import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { Input, Label } from "nav-frontend-skjema";
import { FinnNavKontorResultat, FinnNavKontorResultatDynamisk } from "./FinnNavKontorResultat";
import { kjorSokOgReturnerResultat, minQueryLength, SokeResultat } from "./FinnNavKontorSok";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({id: "finnkontor.tittel"});
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [sokeResultat, setSokeResultat] = useState<SokeResultat | null>();
  const [sokeResultatDynamisk, setSokeResultatDynamisk] = useState<SokeResultat | null>();

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper/>

      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={"finnkontor.tittel"}/>
        </Sidetittel>
        <Normaltekst className={`${cssPrefix}__ingress`}>
          <FormattedMessage id={"finnkontor.ingress"}/>
        </Normaltekst>
      </div>

      <div className={`${cssPrefix}__innhold`}>
        <Form
          onSubmit={() => {
            inputElement && setSokeResultat(kjorSokOgReturnerResultat(inputElement.value));
            setSokeResultatDynamisk(null);
          }}
        >
          <Label htmlFor={"finn-kontor-input-id"}>
            <FormattedMessage id={"finnkontor.sok.label"}/>
          </Label>
          <div className={`${cssPrefix}__input-og-knapp`}>
            <Input
              id={"finn-kontor-input-id"}
              className={`${cssPrefix}__input`}
              type={"text"}
              autoFocus={true}
              autoComplete={"off"}
              onFocus={e => setInputElement(e.target)}
              onChange={e =>
                setSokeResultatDynamisk(kjorSokOgReturnerResultat(e.target.value))
              }
            />
            <Knapp
              htmlType={"submit"}
              type={"standard"}
              className={`${cssPrefix}__knapp`}
              mini={true}
            >
              <FormattedMessage id={"finnkontor.sok.knapp"}/>
            </Knapp>
          </div>

          {sokeResultatDynamisk && sokeResultatDynamisk.query.length >= minQueryLength && (
            <div className={`${cssPrefix}__preview-container`}>
              <FinnNavKontorResultatDynamisk resultat={sokeResultatDynamisk}/>
            </div>
          )}
        </Form>

        {sokeResultat && (
          <div className={`${cssPrefix}__resultat-container`}>
            <FinnNavKontorResultat resultat={sokeResultat}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinnNavKontorPage;
