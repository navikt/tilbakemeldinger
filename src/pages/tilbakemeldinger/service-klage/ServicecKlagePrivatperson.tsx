import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputFodselsnr from "components/input-fields/InputFodselsnr";

const ServiceKlagePrivatperson = () => {
  const intl = useIntl();

  const privPersFormConfig = {
    innmelderNavn: {
      isRequired: "Navn er påkrevd"
    },
    innmelderFnr: {
      isRequired: "Fødselsnummer er påkrevd",
      isExactLength: {
        message: "Fødselsnummer må være 11 siffer",
        length: 11
      }
    }
  };
  return (
    <Validation key={"privPers"} config={privPersFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"L"}
              label={"Navn"}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={v => setField({ innmelderNavn: v })}
            />
            <InputFodselsnr
              bredde={"M"}
              submitted={submitted}
              error={errors.innmelderFnr}
              value={fields.innmelderFnr}
              onChange={v => setField({ innmelderFnr: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlagePrivatperson;
