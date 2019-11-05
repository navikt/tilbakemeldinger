import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  error: string | null;
  label: string;
  submitted: boolean;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value: string;
}

const InputEpost = (props: Props) => {
  const [{ auth, kontaktInfo }] = useStore();
  const { epostadresse } = kontaktInfo;
  const { error, submitted, value, onChange } = props;
  const [blur, settBlur] = useState(false);

  if (auth.authenticated && epostadresse && epostadresse !== value) {
    onChange(epostadresse);
  }

  return (
    <Input
      bredde={props.bredde}
      label={props.label}
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
      feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
      onBlur={() => settBlur(true)}
    />
  );
};

export default InputEpost;
