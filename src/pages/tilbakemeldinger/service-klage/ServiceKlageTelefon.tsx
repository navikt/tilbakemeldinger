import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";

const ServiceKlageTelefon = () => {
  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();
  const [{ kontaktInfo }] = useStore();

  // Trigger validering etter mount dersom form er submitted
  useEffect(() => {
    isSubmitted && trigger();
  }, [isSubmitted, trigger]);

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("innmelderTlfnr", {
          value: kontaktInfo.mobiltelefonnummer ?? "",
          required: formatMessage({ id: "validering.tlf.pakrevd" }),
        })}
        htmlSize={20}
        label={formatMessage({ id: "felter.tlf.tittel" })}
        error={errors?.innmelderTlfnr?.message}
      />
    </div>
  );
};
export default ServiceKlageTelefon;
