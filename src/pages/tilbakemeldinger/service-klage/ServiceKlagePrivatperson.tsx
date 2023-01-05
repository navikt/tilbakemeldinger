import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputFodselsnr from "components/input-fields/InputFodselsnr";

const ServiceKlagePrivatperson = () => {
  const intl = useIntl();
  const initialValues = {} as any;

  const privPersFormConfig = {
    innmelderNavn: {
      isRequired: "validering.navn.pakrevd",
    },
    innmelderFnr: {
      isRequired: "validering.fodselsnr.pakrevd",
      isNumber: "validering.fodselsnr.siffer",
      isExactLength: {
        message: "validering.fodselsnr.korrektsiffer",
        length: 11,
      },
      validFnr: "validering.fodselsnr.ugyldig",
    },
  };
  return (
    <Validation
      key={"privPers"}
      config={privPersFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              label={intl.formatMessage({ id: "felter.navn.tittel" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={(v) => setField({ innmelderNavn: v })}
            />
            <InputFodselsnr
              label={intl.formatMessage({ id: "felter.fodselsnr" })}
              submitted={submitted}
              error={errors.innmelderFnr}
              value={fields.innmelderFnr}
              onChange={(v) => setField({ innmelderFnr: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlagePrivatperson;
