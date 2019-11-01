import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";

const ServiceKlageForBedrift = () => {
  const intl = useIntl();
  const bedriftFormConfig = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    orgNavn: {
      isRequired: intl.formatMessage({ id: "validering.orgnavn.pakrevd" })
    },
    orgNummer: {
      isRequired: intl.formatMessage({ id: "validering.orgnr.pakrevd" }),
      isExactLength: {
        message: intl.formatMessage({ id: "validering.orgnr.korrektsiffer" }),
        length: 9
      }
    },
    orgPostadr: {
      isRequired: intl.formatMessage({ id: "validering.postadr.pakrevd" })
    },
    orgTlfNr: {
      isRequired: intl.formatMessage({ id: "validering.tlf.pakrevd" })
    },
    innmelderRolle: {}
  };
  return (
    <Validation key={"bedrift"} config={bedriftFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.dinrolle.bedrift" })}
              submitted={submitted}
              value={fields.innmelderRolle}
              error={errors.innmelderRolle}
              onChange={v => setField({ innmelderRolle: v })}
            />
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.orgnavn" })}
              submitted={submitted}
              value={fields.orgNavn}
              error={errors.orgNavn}
              onChange={v => setField({ orgNavn: v })}
            />
            <InputField
              bredde={"M"}
              label={intl.formatMessage({ id: "felter.orgnr" })}
              submitted={submitted}
              value={fields.orgNummer}
              error={errors.orgNummer}
              onChange={v => setField({ orgNummer: v })}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForBedrift;
