import React, { useState } from "react";
import { useStore } from "../../providers/Provider";
import { useIntl } from "react-intl";
import { TextField } from "@navikt/ds-react";

interface Props {
  label: string;
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  value: string;
}

const InputNavn = (props: Props) => {
  const [{ auth }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, error, submitted, onChange, label } = props;
  const intl = useIntl();

  if (auth.authenticated && auth.name !== props.value) {
    onChange(auth.name);
  }

  return auth.authenticated ? (
    <TextField value={value} htmlSize={30} label={label} disabled={true} />
  ) : (
    <TextField
      htmlSize={30}
      label={label}
      onChange={(event) => onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      error={
        error && (blur || submitted)
          ? intl.formatMessage({ id: error })
          : undefined
      }
    />
  );
};
export default InputNavn;
