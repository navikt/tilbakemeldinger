import { Input } from "nav-frontend-skjema";
import React from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();

  if (auth.authenticated && auth.name !== props.value) {
    props.onChange(auth.name);
  }

  return auth.authenticated ? (
    <Input
      label={"Navn *"}
      required={true}
      value={props.value}
      disabled={true}
    />
  ) : (
    <Input
      label={"Navn *"}
      required={true}
      value={props.value}
      onChange={event => event.currentTarget.value}
    />
  );
};

export default InputNavn;
