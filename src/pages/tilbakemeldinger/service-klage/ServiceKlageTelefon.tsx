import React from "react";
import { useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";

const ServiceKlageTelefon = () => {
  const {
    register,
    unregister,
    formState: { errors },
    setValue,
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();
  const [{ kontaktInfo }] = useStore();

  // useEffect(() => {
  //   // Set value when component mounts
  //   setValue("innmelderTlfnr", kontaktInfo.mobiltelefonnummer ?? "");
  //   return () => {
  //     // Unregister when component unmounts
  //     unregister("innmelderTlfnr");
  //   };
  // }, []);

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
