import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import ServiceKlageTelefon from "./ServiceKlageTelefon";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";
import { TEXT_AREA_MEDIUM } from "../../../utils/constants";

interface Props {
  innmelderNavn: string | false;
}

const ServiceKlageKontaktBedrift = (props: Props) => {
  const {
    register,
    trigger,
    formState: { errors, isSubmitted },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  const { innmelderNavn } = props;

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
        label={formatMessage({ id: "felter.dittnavn" })}
        error={errors?.innmelderNavn?.message}
        htmlSize={TEXT_AREA_MEDIUM}
        disabled={!!innmelderNavn}
      />
      <ServiceKlageTelefon />
    </div>
  );
};
export default ServiceKlageKontaktBedrift;
