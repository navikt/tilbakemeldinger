import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  error: string | null;
  value: string;
}

const InputTelefon = (props: Props) => {
  const [{ auth, kontaktInfo }] = useStore();
  const { mobiltelefonnummer } = kontaktInfo;
  const [blur, settBlur] = useState(false);

  if (
    auth.authenticated &&
    mobiltelefonnummer &&
    mobiltelefonnummer !== props.value
  ) {
    props.onChange(mobiltelefonnummer);
  }

  const formattert = props.value;

  return kontaktInfo.mobiltelefonnummer ? (
    <Input label={"Telefonnummer"} value={formattert} disabled={true} />
  ) : (
    <Input
      label={"Telefonnummer"}
      required={true}
      value={formattert}
      onChange={event => {
        props.onChange(event.currentTarget.value);
      }}
      feil={props.error && blur ? { feilmelding: props.error } : undefined}
      onBlur={() => settBlur(true)}
    />
  );
};

export default InputTelefon;
