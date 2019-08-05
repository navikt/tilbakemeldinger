import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();
  const [blur, settBlur] = useState(false);

  if (auth.authenticated && auth.name !== props.value) {
    props.onChange(auth.name);
  }

  return auth.authenticated ? (
    <Input
      label={"Navn *"}
      required={true}
      value={props.value}
      disabled={true}
    />
  ) : (
    <Input
      label={"Navn *"}
      required={true}
      value={props.value}
      onChange={event => props.onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      feil={
        props.value.length < 3 && (props.submitted || blur)
          ? { feilmelding: "Navn må bestå av minst 2 tegn" }
          : undefined
      }
    />
  );
};

export default InputNavn;
