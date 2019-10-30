import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputField from "components/input-fields/InputField";

const ServiceKlageForBedrift = () => {
  const intl = useIntl();
  const bedriftFormConfig = {
    innmelderNavn: {
      isRequired: "Navn er påkrevd"
    },
    orgNavn: {
      isRequired: "Organisasjonsnavn er påkrevd"
    },
    orgNummer: {
      isRequired: "Organisasjonsnummer er påkrevd",
      isExactLength: {
        message: "Organisasjonsnummer må ha 9 siffer",
        length: 9
      }
    },
    orgPostadr: {
      isRequired: "Postadresse er påkrevd"
    },
    orgTlfNr: {
      isRequired: "Telefonnummer er påkrevd"
    },
    innmelderRolle: {
      isRequired: "Rolle er påkrevd"
    }
  };
  return (
    <Validation key={"bedrift"} config={bedriftFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"M"}
              label={"Ditt navn"}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={v => setField({ innmelderNavn: v })}
            />
            <InputField
              bredde={"M"}
              label={"Din rolle (leder, HR-ansvarlig, tillitsvalgt osv.)"}
              submitted={submitted}
              value={fields.innmelderRolle}
              error={errors.innmelderRolle}
              onChange={v => setField({ innmelderRolle: v })}
            />
            <InputField
              bredde={"M"}
              label={"Organisasjonsnavn"}
              submitted={submitted}
              value={fields.orgNavn}
              error={errors.orgNavn}
              onChange={v => setField({ orgNavn: v })}
            />
            <InputField
              bredde={"M"}
              label={"Organisasjonsnummer"}
              submitted={submitted}
              value={fields.orgNummer}
              error={errors.orgNummer}
              onChange={v => setField({ orgNummer: v })}
            />
            <InputField
              bredde={"L"}
              label={"Bedriftens postadresse"}
              submitted={submitted}
              value={fields.orgPostadr}
              error={errors.orgPostadr}
              onChange={v => setField({ orgPostadr: v })}
            />
            <InputField
              bredde={"S"}
              label={"Bedriftens telefonnummer"}
              submitted={submitted}
              value={fields.orgTlfNr}
              error={errors.orgTlfNr}
              onChange={v => setField({ orgTlfNr: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForBedrift;
