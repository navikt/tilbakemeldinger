import { fnr } from "@navikt/fnrvalidator";

export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const isNumeric = (value: string) => !!value.match("^\\d+$");

export const isLength = (value: string, length: number) =>
  value.length === length;

export const isValidFnr = (value: string) => fnr(value).status === "valid";

export const isValidTelefonnummer = (value: string) =>
  !!value.replace(/\s/g, "").match("^\\+?\\d+$");

// Brukes for å sjekke om boolske verdier er satt.
// Kan ikke bruke innebygd required, da denne likestiller null/undefined/false.
export const isBoolean = (value: any) => typeof value === "boolean";
