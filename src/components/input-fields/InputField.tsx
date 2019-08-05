import { Input, NavFrontendInputProps } from "nav-frontend-skjema";
import React, { useState } from "react";

interface Props extends Omit<NavFrontendInputProps, "onChange"> {
  onChange: (value: string) => void;
  value: string;
  submitted: boolean;
}

const InputField = (props: Props) => {
  const { onChange, ...newProps } = props;
  const [blur, settBlur] = useState(false);

  return (
    <Input
      onChange={event => onChange(event.currentTarget.value)}
      feil={
        props.value.length < 1 && (props.submitted || blur)
          ? { feilmelding: "Feltet er påkrevd" }
          : undefined
      }
      onBlur={() => settBlur(true)}
      {...newProps}
    />
  );
};

export default InputField;
