import { Input, InputProps } from "nav-frontend-skjema";
import React, { useState } from "react";

interface Props extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  value: string;
  error: string | null;
  submitted: boolean;
}

const InputField = (props: Props) => {
  const { onChange, error, submitted, ...newProps } = props;
  const [blur, settBlur] = useState(false);

  return (
    <Input
      onChange={event => onChange(event.currentTarget.value)}
      feil={error && (submitted || blur) ? error : undefined}
      onBlur={() => settBlur(true)}
      {...newProps}
    />
  );
};

export default InputField;
