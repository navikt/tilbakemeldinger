import { SimpleValidatorConfig } from "calidation";
import { KLAGE_TYPE } from "../types/serviceklage";
import { vars } from "../Config";
import { fnr } from "@navikt/fnrvalidator";
import { IntlShape } from "react-intl";

/*
  Form validators
 */

export const extraValidators = {
  isValidTidsrom:
    (config: SimpleValidatorConfig<any>) =>
    (value: { FORMIDDAG: boolean; ETTERMIDDAG: boolean }) =>
      !(value.FORMIDDAG || value.ETTERMIDDAG) ? config.message : null,

  isValidFeiltyper:
    (config: SimpleValidatorConfig<any>) => (value: KLAGE_TYPE[]) =>
      !value.length ? config.message : null,

  isValidMelding: (config: SimpleValidatorConfig<any>) => (value: string) =>
    value.length > vars.maksLengdeMelding ? config.message : null,

  validFnr: (config: SimpleValidatorConfig<any>) => (value: string) => {
    const result = fnr(value);
    return result.status !== "valid" ? config.message : null;
  },
};

export const sjekkForFeil = (
  submitted: boolean,
  error: string | null,
  intl: IntlShape
) => (submitted && error ? intl.formatMessage({ id: error }) : undefined);
