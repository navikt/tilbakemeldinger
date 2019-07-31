import { Textarea } from "nav-frontend-skjema";
import React, { SyntheticEvent } from "react";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const InputMelding = (props: Props) => {
  return (
    <Textarea
      label={"Melding til NAV *"}
      required={true}
      value={props.value}
      onChange={(e: SyntheticEvent<EventTarget, Event>) => {
        if (e.target instanceof HTMLTextAreaElement) {
          props.onChange(e.target.value);
        }
      }}
    />
  );
};

export default InputMelding;
