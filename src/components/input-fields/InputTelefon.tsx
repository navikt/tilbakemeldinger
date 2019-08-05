import { Input } from "nav-frontend-skjema";
import React, { useState } from "react";
import { useStore } from "../../providers/Provider";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  value: string;
}

const InputTelefon = (props: Props) => {
  const [{ auth, kontaktInfo }] = useStore();
  const { mobiltelefonnummer } = kontaktInfo;
  const [blur, settBlur] = useState(false);

  if (
    auth.authenticated &&
    mobiltelefonnummer &&
    mobiltelefonnummer !== props.value
  ) {
    props.onChange(mobiltelefonnummer);
  }

  const formattert =
    props.value.length === 8
      ? props.value
          .replace(/^(.{3})(.*)$/, "$1 $2")
          .replace(/^(.{6})(.*)$/, "$1 $2")
      : props.value;

  return kontaktInfo.mobiltelefonnummer ? (
    <Input label={"Telefonnummer"} value={formattert} disabled={true} />
  ) : (
    <Input
      label={"Telefonnummer"}
      value={formattert}
      onChange={event => {
        props.onChange(event.currentTarget.value);
      }}
      feil={
        props.submitted || blur
          ? { feilmelding: "Telefonnummeret må være minst 2 tegn" }
          : undefined
      }
      onBlur={() => settBlur(true)}
    />
  );
};

export default InputTelefon;
