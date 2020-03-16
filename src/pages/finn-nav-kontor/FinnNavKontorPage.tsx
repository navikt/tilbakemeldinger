import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Input, Label } from "nav-frontend-skjema";
import { Form } from "calidation";
import { Knapp } from "nav-frontend-knapper";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import { ResultatvisningVedSubmit } from "./components/ResultatvisningVedSubmit";
import { ResultatvisningDynamisk } from "./components/ResultatvisningDynamisk";
import { kjorSokOgReturnerResultat } from "./FinnNavKontorSok";
import { minQueryLength, SokeResultat } from "./FinnNavKontorSok";
import { AlertStripeAdvarsel } from "nav-frontend-alertstriper";
import Lenke from "nav-frontend-lenker";
import { urls } from "../../Config";

const cssPrefix = "finn-kontor";

const FinnNavKontorPage = () => {
  const tittel = useIntl().formatMessage({ id: "finnkontor.tittel" });
  const documentTitle = `${tittel} - www.nav.no`;
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const [inputElement, setInputElement] = useState<HTMLInputElement>();
  const [sokeResultat, setSokeResultat] = useState<SokeResultat | null>();
  const [
    sokeResultatDynamisk,
    setSokeResultatDynamisk
  ] = useState<SokeResultat | null>();

  return (
    <div className={`${cssPrefix} pagecontent`}>
      <BreadcrumbsWrapper />

      <div className={`${cssPrefix}__header`}>
        <Sidetittel>
          <FormattedMessage id={"finnkontor.tittel"} />
        </Sidetittel>

        <Normaltekst className={`${cssPrefix}__ingress`}>
          <FormattedMessage id={"finnkontor.ingress"} />
        </Normaltekst>
      </div>

      <div className={"koronavarsel__container"}>
        <AlertStripeAdvarsel>
          <div className={"koronavarsel__description"}>
            <Normaltekst>
              For å forhindre spredning av koronaviruset er besøk på
              NAV-kontoret nå erstattet med at du kan ta kontakt i digitale
              kanaler. Hvis du er i en krisesituasjon, kan du ringe og få en time hos NAV-kontoret.
            </Normaltekst>
          </div>
          <Lenke href={urls.faq.koronaVirusDialog}>
            Koronavirus - dialog med NAV
          </Lenke>
        </AlertStripeAdvarsel>
      </div>

      <div className={`${cssPrefix}__innhold`}>
        <Form
          onSubmit={() => {
            inputElement &&
              setSokeResultat(kjorSokOgReturnerResultat(inputElement.value));
            setSokeResultatDynamisk(null);
          }}
          className={`${cssPrefix}__input-gruppe`}
        >
          <Label htmlFor={"finn-kontor-input-id"}>
            <FormattedMessage id={"finnkontor.sok.label"} />
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
                setSokeResultatDynamisk(
                  kjorSokOgReturnerResultat(e.target.value)
                )
              }
              onKeyDown={e => e.key === "Escape" && e.currentTarget.blur()}
            />
            <Knapp
              htmlType={"submit"}
              type={"standard"}
              className={`${cssPrefix}__knapp`}
              mini={true}
              id={"finn-kontor-knapp-id"}
            >
              <FormattedMessage id={"finnkontor.sok.knapp"} />
            </Knapp>
          </div>

          {sokeResultatDynamisk &&
            sokeResultatDynamisk.query.length >= minQueryLength && (
              <div
                className={`${cssPrefix}__preview-container`}
                id={"preview-container-id"}
                tabIndex={-1}
              >
                <ResultatvisningDynamisk resultat={sokeResultatDynamisk} />
              </div>
            )}
        </Form>

        {sokeResultat && (
          <div className={`${cssPrefix}__resultat-container`}>
            <ResultatvisningVedSubmit resultat={sokeResultat} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinnNavKontorPage;
