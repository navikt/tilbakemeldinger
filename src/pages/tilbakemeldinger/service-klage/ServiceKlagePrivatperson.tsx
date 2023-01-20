import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { fnr } from "@navikt/fnrvalidator";
import { TextField } from "@navikt/ds-react";

interface Props {
  innmelderNavn: string | false;
  innmelderFnr: string | false;
}

const ServiceKlagePrivatperson = (props: Props) => {
  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  const { innmelderNavn, innmelderFnr } = props;

  // Trigger validering etter mount dersom form er submitted
  useEffect(() => {
    isSubmitted && trigger();
  }, [isSubmitted, trigger]);

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("innmelderNavn", {
          value: innmelderNavn || undefined,
          required: formatMessage({ id: "validering.navn.pakrevd" }),
        })}
        label={formatMessage({ id: "felter.navn.tittel" })}
        error={errors?.innmelderNavn?.message}
        htmlSize={30}
        disabled={!!innmelderNavn}
      />
      <TextField
        {...register("innmelderFnr", {
          value: innmelderFnr || undefined,
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
        htmlSize={20}
        disabled={!!innmelderFnr}
      />
    </div>
  );
};
export default ServiceKlagePrivatperson;
