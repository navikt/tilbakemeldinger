import { Input } from "nav-frontend-skjema";
import React from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputTelefon = (props: Props) => {
  const [{ kontaktInfo }] = useStore();

  return kontaktInfo.mobiltelefonnummer ? (
    <Input label={"Telefonnummer"} value={props.value} disabled={true} />
  ) : (
    <Input
      label={"Telefonnummer"}
      value={props.value}
      onChange={event => props.onChange(event.currentTarget.value)}
    />
  );
};

export default InputTelefon;
