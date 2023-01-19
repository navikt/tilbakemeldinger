import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { Alert, TextField } from "@navikt/ds-react";
import { useFormContext } from "react-hook-form";
import { FeilOgManglerFields } from "./FeilOgMangler";

const FeilOgManglerEpost = () => {
  const {
    register,
    trigger,
    formState: { isSubmitted, errors },
  } = useFormContext<FeilOgManglerFields>();

  // Trigger validering etter rendering dersom form er submitted
  useEffect(() => {
    isSubmitted && trigger();
  }, []);

  const { formatMessage } = useIntl();
  const [{ kontaktInfo }] = useStore();

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("epost", {
          required: formatMessage({ id: "validering.epost.pakrevd" }),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: formatMessage({ id: "validering.epost.gyldig" }),
          },
        })}
        htmlSize={30}
        label={formatMessage({ id: "felter.epost.tittel" })}
        error={errors?.epost?.message}
        defaultValue={kontaktInfo.epostadresse || ""}
      />
      <div className="tilbakemeldinger__svartid">
        <Alert variant={"info"}>
          <FormattedMessage id={"tilbakemeldinger.feilogmangler.svartid"} />
        </Alert>
      </div>
    </div>
  );
};
export default FeilOgManglerEpost;
