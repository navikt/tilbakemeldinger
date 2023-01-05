import React, { useState } from "react";
import { useStore } from "../../providers/Provider";
import { useIntl } from "react-intl";
import { TextField } from "@navikt/ds-react";

interface Props {
  onChange: (value: string) => void;
  submitted: boolean;
  label: string;
  error: string | null;
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  value: string;
}

const InputFodselsnr = (props: Props) => {
  const [{ auth, fodselsnr }] = useStore();
  const [blur, settBlur] = useState(false);
  const { value, label, error, submitted } = props;
  const intl = useIntl();

  if (auth.authenticated && fodselsnr !== value) {
    props.onChange(fodselsnr);
  }

  // todo: fiks bredde
  return auth.authenticated && fodselsnr ? (
    <TextField label={label} disabled={true} />
  ) : (
    <TextField
      label={label}
      onChange={(event) => props.onChange(event.currentTarget.value)}
      onBlur={() => settBlur(true)}
      error={
        error && (blur || submitted)
          ? intl.formatMessage({ id: error })
          : undefined
      }
    />
  );
};

export default InputFodselsnr;
