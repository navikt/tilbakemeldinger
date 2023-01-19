import React from "react";
import { useIntl } from "react-intl";
import { Radio, RadioGroup } from "@navikt/ds-react";
import { Controller, useFormContext } from "react-hook-form";
import { ServiceklageFormFields } from "./ServiceKlage";

const ServiceKlageGjelderSosialhjelp = () => {
  const { control } = useFormContext<ServiceklageFormFields>();

  const { formatMessage } = useIntl();

  return (
    <div className="serviceKlage__ekspandert">
      <Controller
        render={({ field, fieldState: { error } }) => (
          <RadioGroup
            {...field}
            legend={formatMessage({
              id: "felter.gjeldersosialhjelp",
            })}
            error={error?.message}
            value={field.value ?? null}
          >
            <Radio value={"JA"}>
              {formatMessage({
                id: "felter.gjeldersosialhjelp.ja",
              })}
            </Radio>
            <Radio value={"NEI"}>
              {formatMessage({
                id: "felter.gjeldersosialhjelp.nei",
              })}
            </Radio>
            <Radio value={"VET_IKKE"}>
              {formatMessage({
                id: "felter.gjeldersosialhjelp.vetikke",
              })}
            </Radio>
          </RadioGroup>
        )}
        control={control}
        name={"gjelderSosialhjelp"}
        rules={{
          required: formatMessage({
            id: "validering.gjeldersosialhjelp.pakrevd",
          }),
        }}
      />
    </div>
  );
};
export default ServiceKlageGjelderSosialhjelp;
