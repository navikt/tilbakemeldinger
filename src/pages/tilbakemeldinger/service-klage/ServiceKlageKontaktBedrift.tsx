import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "../../../components/input-fields/InputNavn";
import ServiceKlageTelefon from "./ServiceKlageTelefon";

interface Fields {
  innmelderNavn: string;
}

const ServiceKlageKontaktBedrift = () => {
  const intl = useIntl();
  const kontaktBedrift = {
    innmelderNavn: {
      isRequired: "validering.navn.pakrevd",
    },
  };

  const initialValues: Fields = {
    innmelderNavn: "",
  };

  return (
    <Validation
      key={"kontakt-bedrift"}
      config={kontaktBedrift}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              label={intl.formatMessage({ id: "felter.dittnavn" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={(v) => setField({ innmelderNavn: v })}
            />
            <ServiceKlageTelefon />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageKontaktBedrift;
