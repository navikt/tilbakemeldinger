import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  label: string;
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, error, submitted, onChange, label } = props;
  const { bredde } = props;

  if (auth.authenticated && auth.name !== props.value) {
    onChange(auth.name);
  }

  return auth.authenticated ? (
    <Input bredde={bredde} label={label} value={value} disabled={true} />
  ) : (
    <Input
      bredde={bredde}
      label={label}
      value={value}
      onChange={event => onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={error && (blur || submitted) ? error : undefined}
    />
  );
};

export default InputNavn;
