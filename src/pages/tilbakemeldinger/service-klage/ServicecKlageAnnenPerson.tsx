import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputField from "components/input-fields/InputField";
import RadioPanelGruppe from "components/input-fields/RadioPanelGruppe";

const ServiceKlageForAnnenPerson = () => {
  const intl = useIntl();
  const annenPersFormConfig = {
    innmelderNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    paaVegneAvNavn: {
      isRequired: intl.formatMessage({ id: "validering.navn.pakrevd" })
    },
    paaVegneAvFodselsnr: {
      isRequired: intl.formatMessage({ id: "validering.fodselsnr.pakrevd" }),
      isExactLength: {
        message: intl.formatMessage({
          id: "validering.fodselsnr.korrektsiffer"
        }),
        length: 11
      }
    },
    innmelderHarFullmakt: {
      isRequired: "Fullmakt er påkrevd"
    },
    innmelderRolle: {
      isRequired: "Rolle er påkrevd"
    }
  };

  return (
    <Validation key={"annenPers"} config={annenPersFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputNavn
              bredde={"L"}
              label={"Ditt navn"}
              submitted={submitted}
              value={fields.innmelderNavn}
              error={errors.innmelderNavn}
              onChange={v => setField({ innmelderNavn: v })}
            />
            <InputField
              bredde={"M"}
              submitted={submitted}
              label={"Din rolle (nær pårørende, behandler e.l.)"}
              required={true}
              value={fields.innmelderRolle}
              error={errors.innmelderRolle}
              onChange={v => setField({ innmelderRolle: v })}
            />
            <InputField
              bredde={"L"}
              label={"Navn til den som klager"}
              submitted={submitted}
              value={fields.paaVegneAvNavn}
              error={errors.paaVegneAvNavn}
              onChange={v => setField({ paaVegneAvNavn: v })}
            />
            <InputField
              bredde={"S"}
              label={"Fødselsnummer til den som klager"}
              submitted={submitted}
              value={fields.paaVegneAvFodselsnr}
              error={errors.paaVegneAvFodselsnr}
              onChange={v => setField({ paaVegneAvFodselsnr: v })}
            />
            <div className={"serviceKlage__fullmakt"}>
              <RadioPanelGruppe
                legend={"Har du fullmakt?"}
                className="radioPanel__bool"
                radios={[
                  {
                    label: "Ja, jeg har fullmakt",
                    value: "true"
                  },
                  {
                    label: "Nei, jeg har ikke fullmakt",
                    value: "false"
                  }
                ]}
                name={"fullmakt"}
                submitted={submitted}
                checked={fields.innmelderHarFullmakt}
                error={errors.innmelderHarFullmakt}
                onChange={v => setField({ innmelderHarFullmakt: v })}
              />
            </div>
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForAnnenPerson;
