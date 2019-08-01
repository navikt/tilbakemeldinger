import { Input, NavFrontendInputProps } from "nav-frontend-skjema";
import React from "react";

interface Props extends Omit<NavFrontendInputProps, "onChange"> {
  onChange: (value: string) => void;
}

const InputField = (props: Props) => {
  const { onChange, ...newProps } = props;

  return (
    <Input
      onChange={event => props.onChange(event.currentTarget.value)}
      {...newProps}
    />
  );
};

export default InputField;
