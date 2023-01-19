import React from "react";
import { useIntl } from "react-intl";
import InputNavn from "components/input-fields/InputNavn";
import InputFodselsnr from "components/input-fields/InputFodselsnr";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { fnr } from "@navikt/fnrvalidator";

const ServiceKlagePrivatperson = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  return (
    <div className="serviceKlage__ekspandert">
      <InputNavn
        {...register("innmelderNavn", {
          required: formatMessage({ id: "validering.navn.pakrevd" }),
        })}
        label={formatMessage({ id: "felter.navn.tittel" })}
        error={errors?.innmelderNavn?.message}
      />
      <InputFodselsnr
        {...register("innmelderFnr", {
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
        label={formatMessage({ id: "felter.fodselsnr" })}
        error={errors?.innmelderFnr?.message}
      />
    </div>
  );
};
export default ServiceKlagePrivatperson;
