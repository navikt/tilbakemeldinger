import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "../../../components/input-fields/InputNavn";
import InputField from "../../../components/input-fields/InputField";

const ServiceKlageKontaktBedrift = () => {
  const intl = useIntl();
  const kontaktBedrift = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    orgPostadr: {
      isRequired: intl.formatMessage({ id: "validering.postadr.pakrevd" })
    }
  };

  return (
    <Validation key={"kontakt-bedrift"} config={kontaktBedrift}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.dittnavn" })}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={v => setField({ innmelderNavn: v })}
            />
            <InputField
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.postadr" })}
              submitted={submitted}
              value={fields.orgPostadr}
              error={errors.orgPostadr}
              onChange={v => setField({ orgPostadr: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageKontaktBedrift;
