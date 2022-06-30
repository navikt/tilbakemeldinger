import React, { useEffect } from "react";
import { useStore } from "../../providers/Provider";
import { Element } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import NavFrontendSpinner from "nav-frontend-spinner";
import { fetchEnheter } from "../../clients/apiClient";
import { Enhet } from "../../types/enheter";
import { HTTPError } from "types/errors";
import { SkjemaelementFeilmelding } from "nav-frontend-skjema";
import Combobox from "./EnhetCombobox";

const cssPrefix = "selectEnhet";

interface Option {
  value: string;
  label: string;
}

interface Props {
  onChange: (value: Option | undefined) => void;
  error: string | null;
  label: string;
  submitted: boolean;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value?: Option;
}

const SelectEnhet = (props: Props) => {
  const [{ enheter }, dispatch] = useStore();
  const intl = useIntl();
  const { submitted, error, label, onChange, value } = props;

  const relevanteEnheter = [
    "ALS",
    "ARK",
    "FPY",
    "FYLKE",
    "HMS",
    "INTRO",
    "KLAGE",
    "KO",
    "KONTROLL",
    "LOKAL",
    "OKONOMI",
    "TILTAK",
    "YTA",
    "OPPFUTLAND",
  ];

  useEffect(() => {
    fetchEnheter()
      .then((enheter: Enhet[]) => {
        dispatch({
          type: "SETT_ENHETER_RESULT",
          payload: enheter.filter(
            (e) => e.enhetNr !== "0000" && relevanteEnheter.includes(e.type)
          ),
        });
      })
      .catch((error: HTTPError) => {
        dispatch({ type: "SETT_ENHETER_ERROR", payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comboBoxLabel = () => (
    <div className={`${cssPrefix}__label`}>
      <Element>
        <FormattedMessage id={label} />
        <span className={`${cssPrefix}__hjelpetekst`}>
          {`- ${intl.formatMessage({
            id: "felter.hvemroses.navkontor.skrivinn",
          })}`}
        </span>
      </Element>
    </div>
  );

  return (
    <div className={`${cssPrefix}__navkontor`}>
      {enheter.status === "RESULT" ? (
        <Combobox
          harFeil={!!(submitted && error)}
          label={comboBoxLabel()}
          onChange={onChange}
          value={value}
          data={enheter.data
            .sort((a, b) => (a.navn < b.navn ? -1 : 1))
            .map((enhet) => ({
              value: enhet.enhetNr,
              label: `${enhet.navn} - ${enhet.enhetNr}`,
            }))}
        />
      ) : (
        <div className={`${cssPrefix}__spinner`}>
          <NavFrontendSpinner />
        </div>
      )}
      {submitted && error && (
        <SkjemaelementFeilmelding>{error}</SkjemaelementFeilmelding>
      )}
    </div>
  );
};

export default SelectEnhet;
