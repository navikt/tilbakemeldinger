import { Input, InputProps } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useIntl } from "react-intl";

interface Props extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
  value: string;
  error: string | null;
  submitted: boolean;
}

const InputField = (props: Props) => {
  const { onChange, error, submitted, ...newProps } = props;
  const [blur, settBlur] = useState(false);
  const intl = useIntl();

  return (
    <Input
      onChange={(event) => onChange(event.currentTarget.value)}
      feil={
        error && (submitted || blur)
          ? intl.formatMessage({ id: error })
          : undefined
      }
      onBlur={() => settBlur(true)}
      {...newProps}
    />
  );
};

export default InputField;
