import { Textarea, TextareaProps } from "nav-frontend-skjema";
import React, { SyntheticEvent, useState } from "react";

interface Props extends Omit<TextareaProps, "onChange"> {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  value: string;
}

const InputMelding = (props: Props) => {
  const [blur, settBlur] = useState(false);
  const { error, value, label, submitted } = props;
  return (
    <>
      <div className={"skjema__legend"}>{label}</div>
      <div>
        Unngå sensitive personopplysninger, som f.eks eksempel opplysninger om
        helseforhold eller diagnoser
      </div>
      <Textarea
        label={""}
        required={true}
        value={value}
        onChange={(e: SyntheticEvent<EventTarget, Event>) => {
          if (e.target instanceof HTMLTextAreaElement) {
            props.onChange(e.target.value);
          }
        }}
        feil={error && (blur || submitted) ? { feilmelding: error } : undefined}
        onBlur={() => settBlur(true)}
        maxLength={0}
      />
    </>
  );
};

export default InputMelding;
