import React, { useEffect } from "react";
import { useStore } from "../../providers/Provider";
import { Element } from "nav-frontend-typografi";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import { ValueType } from "react-select/src/types";
import NavFrontendSpinner from "nav-frontend-spinner";
import { fetchEnheter } from "../../clients/apiClient";
import { Enheter } from "../../types/enheter";
import { HTTPError } from "../error/Error";

interface Option {
  value: string;
  label: string;
}

interface Props {
  onChange: (value: ValueType<Option>) => void;
  error: string | null;
  label: string;
  submitted: boolean;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value: ValueType<Option>;
}

const SelectEnhet = (props: Props) => {
  const [{ enheter }, dispatch] = useStore();
  const intl = useIntl();
  const { submitted, value, onChange, error, label } = props;

  useEffect(() => {
    fetchEnheter()
      .then((enheter: Enheter[]) => {
        dispatch({ type: "SETT_ENHETER_RESULT", payload: enheter });
      })
      .catch((error: HTTPError) => {
        dispatch({ type: "SETT_ENHETER_ERROR", payload: error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ros-til-nav__navkontor">
      <div className="ros-til-nav__label">
        <Element>
          <FormattedMessage id={label} />
        </Element>
      </div>
      {enheter.status === "RESULT" ? (
        <Select
          placeholder={intl.formatMessage({
            id: "felter.hvemroses.navkontor.skrivinn"
          })}
          classNamePrefix={
            submitted && error ? "ros-til-nav-feil" : "ros-til-nav"
          }
          value={value}
          onChange={onChange}
          options={enheter.data
            .sort((a, b) => (a.enhetsnavn < b.enhetsnavn ? -1 : 1))
            .map(enhet => ({
              value: enhet.enhetsnummer,
              label: `${enhet.enhetsnavn} -  ${enhet.enhetsnummer}`
            }))}
        />
      ) : (
        <div className="ros-til-nav__spinner">
          <NavFrontendSpinner />
        </div>
      )}
      {submitted && error && (
        <div role="alert" aria-live="assertive">
          <div className="skjemaelement__feilmelding">{error}</div>
        </div>
      )}
    </div>
  );
};

export default SelectEnhet;
