import React from "react";
import { useIntl } from "react-intl";
import InputNavn from "../../../components/input-fields/InputNavn";
import ServiceKlageTelefon from "./ServiceKlageTelefon";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";

const ServiceKlageKontaktBedrift = () => {
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
        label={formatMessage({ id: "felter.dittnavn" })}
        error={errors?.innmelderNavn?.message}
      />
      <ServiceKlageTelefon />
    </div>
  );
};
export default ServiceKlageKontaktBedrift;
