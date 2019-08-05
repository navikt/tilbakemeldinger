import { RadioPanelGruppe, RadioPanelGruppeProps } from "nav-frontend-skjema";
import React from "react";

interface Props extends Omit<RadioPanelGruppeProps, "onChange"> {
  onChange: (value: any) => void;
  feilmelding: string;
  submitted: boolean;
}

const RPG = (props: Props) => {
  const { onChange, submitted, feilmelding, ...newProps } = props;

  return (
    <RadioPanelGruppe
      onChange={(event: React.SyntheticEvent<EventTarget>, value: string) =>
        onChange(value)
      }
      feil={submitted && !props.checked ? { feilmelding } : undefined}
      {...newProps}
    />
  );
};

export default RPG;
