import { Input } from "nav-frontend-skjema";
import React from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputFodselsnr = (props: Props) => {
  const [{ auth, fodselsnr }] = useStore();

  return auth.authenticated && fodselsnr ? (
    <Input
      label={"Fødselsnummer *"}
      required={true}
      value={props.value}
      disabled={true}
    />
  ) : (
    <Input
      label={"Fødselsnummer *"}
      required={true}
      value={props.value}
      onChange={event => props.onChange(event.currentTarget.value)}
    />
  );
};

export default InputFodselsnr;
