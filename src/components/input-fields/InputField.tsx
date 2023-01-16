import React, { useState } from "react";
import { useIntl } from "react-intl";
import { TextField, TextFieldProps } from "@navikt/ds-react";

interface Props extends Omit<TextFieldProps, "onChange"> {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  htmlSize: number;
}

const InputField = (props: Props) => {
  const { onChange, error, submitted, htmlSize, ...newProps } = props;
  const [blur, settBlur] = useState(false);
  const intl = useIntl();

  return (
    <TextField
      htmlSize={htmlSize}
      onChange={(event) => onChange(event.currentTarget.value)}
      error={
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
