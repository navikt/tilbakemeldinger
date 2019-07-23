import { Input } from "nav-frontend-skjema";
import React from "react";
import { useStore } from "../../providers/Provider";

const InputNavn = () => {
  const [{ auth }] = useStore();
  return auth.status === "RESULT" && auth.data.authenticated ? (
    <Input
      label={"Navn *"}
      required={true}
      value={auth.data.name}
      disabled={true}
    />
  ) : (
    <Input label={"Navn *"} required={true} />
  );
};

export default InputNavn;
