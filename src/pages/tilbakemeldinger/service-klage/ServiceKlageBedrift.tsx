import React from "react";
import { useIntl } from "react-intl";
import SelectEnhet from "../../../components/input-fields/SelectEnhet";
import { useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";
import { TextField } from "@navikt/ds-react";

const ServiceKlageForBedrift = () => {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { isSubmitted, errors },
  } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("innmelderRolle")}
        htmlSize={30}
        label={formatMessage({ id: "felter.dinrolle.bedrift" })}
        error={errors?.innmelderRolle?.message}
      />
      <TextField
        {...register("orgNavn", {
          required: formatMessage({ id: "validering.orgnavn.pakrevd" }),
        })}
        htmlSize={30}
        label={formatMessage({ id: "felter.orgnavn" })}
        error={errors?.orgNavn?.message}
      />
      <TextField
        {...register("orgNummer", {
          required: formatMessage({ id: "validering.orgnr.pakrevd" }),
          validate: {
            isNumber: (v) =>
              !!v.match("^[0-9]+$") ||
              formatMessage({ id: "validering.orgnr.siffer" }),
            isLength11: (v) =>
              v.length === 9 ||
              formatMessage({ id: "validering.orgnr.korrektsiffer" }),
          },
        })}
        htmlSize={30}
        label={formatMessage({ id: "felter.orgnr" })}
        error={errors?.orgNummer?.message}
      />
      <SelectEnhet
        {...register("enhetsnummerPaaklaget", {
          required: formatMessage({
            id: "validering.navkontor.pakrevd",
          }),
        })}
        label={"felter.klagerpa.navkontor.velg"}
        error={errors?.enhetsnummerPaaklaget?.message}
        submitted={isSubmitted}
        onChange={async (v?: { value: string; label: string }) => {
          v && setValue("enhetsnummerPaaklaget", v);
          isSubmitted && (await trigger());
        }}
        value={watch().enhetsnummerPaaklaget}
        triggerValidation={trigger}
      />
    </div>
  );
};
export default ServiceKlageForBedrift;
