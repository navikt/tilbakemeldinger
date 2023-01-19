import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import InputNavn from "components/input-fields/InputNavn";
import { urls } from "../../../Config";
import { Alert, Link, Radio, RadioGroup, TextField } from "@navikt/ds-react";
import { Controller, useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { fnr } from "@navikt/fnrvalidator";

const ServiceKlageForAnnenPerson = () => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  return (
    <div className="serviceKlage__ekspandert">
      <InputNavn
        {...register("innmelderNavn", {
          required: formatMessage({ id: "validering.navn.pakrevd" }),
        })}
        label={formatMessage({ id: "felter.dittnavn" })}
        error={errors?.innmelderNavn?.message}
      />
      <TextField
        {...register("innmelderRolle", {
          required: formatMessage({ id: "validering.rolle.pakrevd" }),
        })}
        htmlSize={30}
        label={formatMessage({ id: "felter.dinrolle.annenperson" })}
        error={errors?.innmelderRolle?.message}
      />
      <TextField
        {...register("paaVegneAvNavn", {
          required: formatMessage({ id: "validering.navn.pakrevd" }),
        })}
        htmlSize={30}
        label={formatMessage({ id: "felter.navntilklager" })}
        error={errors?.paaVegneAvNavn?.message}
      />
      <TextField
        {...register("paaVegneAvFodselsnr", {
          required: formatMessage({ id: "validering.fodselsnr.pakrevd" }),
          validate: {
            isNumber: (v) =>
              !!v.match("^[0-9]+$") ||
              formatMessage({ id: "validering.fodselsnr.siffer" }),
            isLength11: (v) =>
              v.length === 11 ||
              formatMessage({ id: "validering.fodselsnr.korrektsiffer" }),
            isValidFnr: (v) =>
              fnr(v).status === "valid" ||
              formatMessage({ id: "validering.fodselsnr.ugyldig" }),
          },
        })}
        htmlSize={20}
        label={formatMessage({ id: "felter.fodselsnrtilklager" })}
        error={errors?.paaVegneAvFodselsnr?.message}
      />

      <Controller
        render={({ field, fieldState: { error } }) => (
          <RadioGroup
            {...field}
            legend={formatMessage({
              id: "felter.fullmakt",
            })}
            error={error?.message}
            value={field.value ?? null}
          >
            <Radio value={true}>
              {formatMessage({
                id: "felter.fullmakt.ja",
              })}
            </Radio>
            <Radio value={false}>
              {formatMessage({
                id: "felter.fullmakt.nei",
              })}
            </Radio>{" "}
            {watch().innmelderHarFullmakt === false && (
              <Alert variant={"warning"}>
                <FormattedMessage
                  id={"felter.fullmakt.advarsel"}
                  values={{
                    FullmaktskjemaLenke: (text: string) => (
                      <Link
                        href={urls.tilbakemeldinger.serviceklage.fullmaktskjema}
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
        )}
        control={control}
        name={"innmelderHarFullmakt"}
        rules={{
          // Kan ikke bruke innebygd required da denne ikke validerer value={false}
          validate: {
            isRequired: (v) =>
              typeof v === "boolean" ||
              formatMessage({
                id: "validering.fullmakt.pakrevd",
              }),
          },
        }}
      />
    </div>
  );
};
export default ServiceKlageForAnnenPerson;
