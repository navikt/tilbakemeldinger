import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  value: string;
}

const InputFodselsnr = (props: Props) => {
  const [{ auth, fodselsnr }] = useStore();
  const [blur, settBlur] = useState(false);

  if (auth.authenticated && fodselsnr !== props.value) {
    props.onChange(fodselsnr);
  }

  const formattert = props.value;

  return auth.authenticated && fodselsnr ? (
    <Input
      label={"Fødselsnummer *"}
      required={true}
      value={formattert}
      disabled={true}
    />
  ) : (
    <Input
      label={"Fødselsnummer *"}
      required={true}
      value={formattert}
      onChange={event => props.onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={
        (props.submitted || blur) &&
        (!/^\d+$/.test(props.value) || props.value.length !== 11)
          ? { feilmelding: "Fødselsnummer må være 11 siffer" }
          : undefined
      }
    />
  );
};

export default InputFodselsnr;
