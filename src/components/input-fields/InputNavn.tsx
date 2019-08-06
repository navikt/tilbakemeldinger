import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  error: string | null;
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, error, onChange } = props;

  if (auth.authenticated && auth.name !== props.value) {
    onChange(auth.name);
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
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={error && blur ? { feilmelding: props.error } : undefined}
    />
  );
};

export default InputNavn;
