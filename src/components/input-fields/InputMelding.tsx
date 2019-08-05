import { Textarea } from "nav-frontend-skjema";
import React, { SyntheticEvent, useState } from "react";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  value: string;
}

const InputMelding = (props: Props) => {
  const [blur, settBlur] = useState(false);
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
      feil={
        props.value.length < 3 && (props.submitted || blur)
          ? { feilmelding: "Meldingen må bestå av minimum 2 tegn" }
          : undefined
      }
      onBlur={() => {
        console.log("Blur");
        settBlur(true);
      }}
    />
  );
};

export default InputMelding;
