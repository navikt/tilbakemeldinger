import { Input } from "nav-frontend-skjema";
import React from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputTelefon = (props: Props) => (
  <Input
    label={"Telefonnummer"}
    value={props.value}
    onChange={event => props.onChange(event.currentTarget.value)}
  />
);

export default InputTelefon;
