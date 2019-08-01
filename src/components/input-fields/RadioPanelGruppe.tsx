import { RadioPanelGruppe, RadioPanelGruppeProps } from "nav-frontend-skjema";
import React from "react";

interface Props extends Omit<RadioPanelGruppeProps, "onChange"> {
  onChange: (value: string) => void;
}

const InputField = (props: Props) => {
  const { onChange, ...newProps } = props;

  return (
    <RadioPanelGruppe
      onChange={(event: React.SyntheticEvent<EventTarget>, value: string) =>
        onChange(value)
      }
      {...newProps}
    />
  );
};

export default InputField;
