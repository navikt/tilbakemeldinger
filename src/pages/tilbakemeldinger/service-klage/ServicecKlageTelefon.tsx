import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputTelefon from "components/input-fields/InputTelefon";

const ServiceKlageTelefon = () => {
  const intl = useIntl();
  const tlfFormConfig = {
    innmelderTlfnr: {
      isRequired: "Telefonnummer er påkrevd"
    }
  };

  return (
    <Validation key={"tlf"} config={tlfFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputTelefon
              bredde={"S"}
              label={"Telefon"}
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
