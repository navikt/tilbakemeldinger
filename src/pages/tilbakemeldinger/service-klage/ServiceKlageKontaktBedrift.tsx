import React from "react";
import { useIntl } from "react-intl";
import ServiceKlageTelefon from "./ServiceKlageTelefon";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";

interface Props {
  innmelderNavn: string | false;
}

const ServiceKlageKontaktBedrift = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  const { innmelderNavn } = props;

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("innmelderNavn", {
          value: innmelderNavn || undefined,
          required: formatMessage({ id: "validering.navn.pakrevd" }),
        })}
        label={formatMessage({ id: "felter.dittnavn" })}
        error={errors?.innmelderNavn?.message}
        htmlSize={30}
        disabled={!!innmelderNavn}
      />
      <ServiceKlageTelefon />
    </div>
  );
};
export default ServiceKlageKontaktBedrift;
