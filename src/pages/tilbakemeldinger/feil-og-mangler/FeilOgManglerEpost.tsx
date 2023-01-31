import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useStore } from "providers/Provider";
import { Alert, TextField } from "@navikt/ds-react";
import { useFormContext } from "react-hook-form";
import { FeilOgManglerFields } from "./FeilOgMangler";
import { EMAIL_PATTERN } from "../../../utils/validators";

const FeilOgManglerEpost = () => {
  const {
    register,
    trigger,
    formState: { isSubmitted, errors },
  } = useFormContext<FeilOgManglerFields>();

  // Trigger validering etter mount dersom form er submitted
  useEffect(() => {
    isSubmitted && trigger();
  }, [isSubmitted, trigger]);

  const { formatMessage } = useIntl();
  const [{ kontaktInfo }] = useStore();

  return (
    <div className="serviceKlage__ekspandert">
      <TextField
        {...register("epost", {
          required: formatMessage({ id: "validering.epost.pakrevd" }),
          pattern: {
            value: EMAIL_PATTERN,
            message: formatMessage({ id: "validering.epost.gyldig" }),
          },
        })}
        className="skjema__input--medium"
        label={formatMessage({ id: "felter.epost.tittel" })}
        error={errors?.epost?.message}
        defaultValue={kontaktInfo.epostadresse || ""}
        autoComplete={"email"}
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
