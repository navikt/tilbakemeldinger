import React from "react";
import { useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";

const ServiceKlageTelefon = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();
  const [{ kontaktInfo }] = useStore();

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("innmelderTlfnr", {
          required: formatMessage({ id: "validering.tlf.pakrevd" }),
        })}
        htmlSize={20}
        label={formatMessage({ id: "felter.tlf.tittel" })}
        error={errors?.innmelderTlfnr?.message}
        defaultValue={kontaktInfo.mobiltelefonnummer || ""}
      />
    </div>
  );
};
export default ServiceKlageTelefon;
