import { TextareaControlled } from "nav-frontend-skjema";
import React from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputMelding = (props: Props) => (
  <TextareaControlled
    defaultValue={""}
    label={"Melding til NAV *"}
    required={true}
    value={props.value}
    onChange={event => props.onChange(event.currentTarget.value)}
  />
);

export default InputMelding;
