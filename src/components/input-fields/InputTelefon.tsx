import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  error: string | null;
  label: string;
  submitted: boolean;
  value: string;
}

const InputTelefon = (props: Props) => {
  const [{ auth, kontaktInfo }] = useStore();
  const { mobiltelefonnummer } = kontaktInfo;
  const { error, submitted, value, onChange } = props;
  const [blur, settBlur] = useState(false);

  if (
    auth.authenticated &&
    mobiltelefonnummer &&
    mobiltelefonnummer !== value
  ) {
    onChange(mobiltelefonnummer);
  }

  const formattert = value;

  return kontaktInfo.mobiltelefonnummer ? (
    <Input label={props.label} value={formattert} disabled={true} />
  ) : (
    <Input
      label={props.label}
      required={true}
      value={formattert}
      onChange={event => onChange(event.currentTarget.value)}
      feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
      onBlur={() => settBlur(true)}
    />
  );
};

export default InputTelefon;
