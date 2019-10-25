import {
  Dictionary,
  FieldConfig,
  SimpleValidator,
  SimpleValidatorConfig,
  ValidatorContext
} from "calidation";

/*
  Form validators
 */

export type ExtraFieldsConfig = Dictionary<FieldConfig & ExtraFieldConfig>;
export interface ExtraFieldConfig {
  isValidTidsrom?: SimpleValidator;
}

export const extraValidators: Validators = {
  isValidTidsrom: (config: SimpleValidatorConfig) => (value: {
    FORMIDDAG: boolean;
    ETTERMIDDAG: boolean;
  }) => (!(value.FORMIDDAG || value.ETTERMIDDAG) ? config.message : null)
};

/*
  Overridden types
 */

export type SimpleValidators = Dictionary<
  (config: SimpleValidatorConfig) => (value: any) => string | null
>;

export interface CustomValidator {
  message: (values: object) => string;
  validateIf?: ((context: ValidatorContext) => boolean) | boolean;
}

export type Validators = Dictionary<
  (
    config: SimpleValidatorConfig & CustomValidator,
    context: ValidatorContext
  ) => (value: any) => string | null
>;
