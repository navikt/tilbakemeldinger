import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputField from "components/input-fields/InputField";
import { sjekkForFeil } from "utils/validators";
import { urls } from "../../../Config";
import { Alert, Link, Radio, RadioGroup } from "@navikt/ds-react";

interface Fields {
  innmelderNavn: string;
  paaVegneAvNavn: string;
  paaVegneAvFodselsnr: string;
  innmelderHarFullmakt?: boolean;
  innmelderRolle: string;
}

const ServiceKlageForAnnenPerson = () => {
  const intl = useIntl();
  const annenPersFormConfig = {
    innmelderNavn: {
      isRequired: "validering.navn.pakrevd",
    },
    paaVegneAvNavn: {
      isRequired: "validering.navn.pakrevd",
    },
    paaVegneAvFodselsnr: {
      isRequired: "validering.fodselsnr.pakrevd",
      isNumber: "validering.fodselsnr.siffer",
      isExactLength: {
        message: "validering.fodselsnr.korrektsiffer",
        length: 11,
      },
      validFnr: "validering.fodselsnr.ugyldig",
    },
    innmelderHarFullmakt: {
      isRequired: "validering.fullmakt.pakrevd",
    },
    innmelderRolle: {
      isRequired: "validering.rolle.pakrevd",
    },
  };

  const initialValues: Fields = {
    innmelderNavn: "",
    paaVegneAvNavn: "",
    paaVegneAvFodselsnr: "",
    innmelderRolle: "",
  };

  return (
    <Validation
      key={"annenPers"}
      config={annenPersFormConfig}
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
            <InputField
              htmlSize={30}
              submitted={submitted}
              label={intl.formatMessage({ id: "felter.dinrolle.annenperson" })}
              required={true}
              error={errors.innmelderRolle}
              onChange={(v) => setField({ innmelderRolle: v })}
            />
            <InputField
              htmlSize={30}
              label={intl.formatMessage({ id: "felter.navntilklager" })}
              submitted={submitted}
              error={errors.paaVegneAvNavn}
              onChange={(v) => setField({ paaVegneAvNavn: v })}
            />
            <InputField
              htmlSize={20}
              label={intl.formatMessage({ id: "felter.fodselsnrtilklager" })}
              submitted={submitted}
              error={errors.paaVegneAvFodselsnr}
              onChange={(v) => setField({ paaVegneAvFodselsnr: v })}
            />
            <RadioGroup
              legend={intl.formatMessage({
                id: "felter.fullmakt",
              })}
              error={sjekkForFeil(submitted, errors.innmelderHarFullmakt, intl)}
              onChange={(val) => setField({ innmelderHarFullmakt: val })}
            >
              <Radio value={true}>
                {intl.formatMessage({
                  id: "felter.fullmakt.ja",
                })}
              </Radio>
              <Radio value={false}>
                {intl.formatMessage({
                  id: "felter.fullmakt.nei",
                })}
              </Radio>{" "}
              {fields.innmelderHarFullmakt === false && (
                <Alert variant={"warning"}>
                  <FormattedMessage
                    id={"felter.fullmakt.advarsel"}
                    values={{
                      FullmaktskjemaLenke: (text: string) => (
                        <Link
                          href={
                            urls.tilbakemeldinger.serviceklage.fullmaktskjema
                          }
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {text}
                        </Link>
                      ),
                    }}
                  />
                </Alert>
              )}
            </RadioGroup>
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageForAnnenPerson;
