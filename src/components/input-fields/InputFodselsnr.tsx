import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  label: string;
  error: string | null;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value: string;
}

const InputFodselsnr = (props: Props) => {
  const [{ auth, fodselsnr }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, label, error, submitted, bredde } = props;

  if (auth.authenticated && fodselsnr !== value) {
    props.onChange(fodselsnr);
  }

  return auth.authenticated && fodselsnr ? (
    <Input bredde={bredde} label={label} value={value} disabled={true} />
  ) : (
    <Input
      bredde={bredde}
      label={label}
      value={value}
      onChange={event => props.onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
    />
  );
};

export default InputFodselsnr;
