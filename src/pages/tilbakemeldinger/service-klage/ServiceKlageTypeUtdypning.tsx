import React from "react";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";
import { useIntl } from "react-intl";

const ServiceKlageTypeUtdypning = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("klagetypeUtdypning", {
          required: formatMessage({
            id: "validering.klagetype.utdypning.pakrevd",
          }),
        })}
        htmlSize={30}
        label={""}
        error={errors?.klagetypeUtdypning?.message}
      />
    </div>
  );
};
export default ServiceKlageTypeUtdypning;
