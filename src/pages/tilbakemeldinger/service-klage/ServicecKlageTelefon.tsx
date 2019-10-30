import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputTelefon from "components/input-fields/InputTelefon";

const ServiceKlageTelefon = () => {
  const intl = useIntl();
  const tlfFormConfig = {
    innmelderTlfnr: {
      isRequired: intl.formatMessage({ id: "validering.tlf.pakrevd" })
    }
  };

  return (
    <Validation key={"tlf"} config={tlfFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputTelefon
              bredde={"S"}
              label={intl.formatMessage({ id: "felter.tlf.tittel" })}
              value={fields.innmelderTlfnr}
              error={errors.innmelderTlfnr}
              onChange={v => setField({ innmelderTlfnr: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageTelefon;
