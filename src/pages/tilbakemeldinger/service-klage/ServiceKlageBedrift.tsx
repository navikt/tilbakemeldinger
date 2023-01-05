import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";
import SelectEnhet from "../../../components/input-fields/SelectEnhet";

interface Fields {
  innmelderRolle: string;
  orgNavn: string;
  orgNummer: string;
  enhetsnummerPaaklaget?: {
    value: string;
    label: string;
  };
}

const ServiceKlageForBedrift = () => {
  const intl = useIntl();
  const bedriftFormConfig = {
    innmelderRolle: {},
    orgNavn: {
      isRequired: "validering.orgnavn.pakrevd",
    },
    orgNummer: {
      isRequired: "validering.orgnr.pakrevd",
      isNumber: "validering.orgnr.siffer",
      isExactLength: {
        message: "validering.orgnr.korrektsiffer",
        length: 9,
      },
    },
    enhetsnummerPaaklaget: {
      isRequired: "validering.navkontor.pakrevd",
    },
  };

  const initialValues: Fields = {
    innmelderRolle: "",
    orgNavn: "",
    orgNummer: "",
    enhetsnummerPaaklaget: undefined,
  };

  return (
    <Validation
      key={"bedrift"}
      config={bedriftFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              label={intl.formatMessage({ id: "felter.dinrolle.bedrift" })}
              submitted={submitted}
              error={errors.innmelderRolle}
              onChange={(v) => setField({ innmelderRolle: v })}
            />
            <InputField
              label={intl.formatMessage({ id: "felter.orgnavn" })}
              submitted={submitted}
              error={errors.orgNavn}
              onChange={(v) => setField({ orgNavn: v })}
            />
            <InputField
              label={intl.formatMessage({ id: "felter.orgnr" })}
              submitted={submitted}
              error={errors.orgNummer}
              onChange={(v) => setField({ orgNummer: v })}
            />
            <SelectEnhet
              label={"felter.klagerpa.navkontor.velg"}
              error={errors.enhetsnummerPaaklaget}
              submitted={submitted}
              value={fields.enhetsnummerPaaklaget}
              onChange={(v?: { value: string; label: string }) =>
                setField({ enhetsnummerPaaklaget: v })
              }
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForBedrift;
