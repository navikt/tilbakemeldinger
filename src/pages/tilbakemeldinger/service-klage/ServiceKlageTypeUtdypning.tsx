import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import { TEXT_AREA_MEDIUM } from "../../../utils/constants";

const ServiceKlageTypeUtdypning = () => {
  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  // Trigger validering etter mount dersom form er submitted
  useEffect(() => {
    isSubmitted && trigger();
  }, [isSubmitted, trigger]);

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("klagetypeUtdypning", {
          required: formatMessage({
            id: "validering.klagetype.utdypning.pakrevd",
          }),
        })}
        htmlSize={TEXT_AREA_MEDIUM}
        label={""}
        error={errors?.klagetypeUtdypning?.message}
      />
    </div>
  );
};
export default ServiceKlageTypeUtdypning;
