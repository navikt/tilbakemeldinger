import React, { ForwardedRef } from "react";
import { useStore } from "../../providers/Provider";
import { TextField, TextFieldProps } from "@navikt/ds-react";

const InputNavn = React.forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<any>) => {
    const [{ auth }] = useStore();

    const fieldSize = 30;

    return auth.authenticated && auth.name ? (
      <TextField
        {...props}
        value={auth.name}
        htmlSize={fieldSize}
        disabled={true}
        ref={ref}
      />
    ) : (
      <TextField {...props} htmlSize={fieldSize} ref={ref} />
    );
  }
);

export default InputNavn;
