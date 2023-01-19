import React, { ForwardedRef } from "react";
import { useStore } from "../../providers/Provider";
import { TextField, TextFieldProps } from "@navikt/ds-react";

const InputFodselsnr = React.forwardRef(
  (props: TextFieldProps, ref: ForwardedRef<any>) => {
    const [{ auth, fodselsnr }] = useStore();

    const fieldSize = 20;

    return auth.authenticated && fodselsnr ? (
      <TextField
        {...props}
        defaultValue={fodselsnr} // todo: fiks dette
        disabled={true}
        htmlSize={fieldSize}
        ref={ref}
      />
    ) : (
      <TextField {...props} htmlSize={fieldSize} ref={ref} />
    );
  }
);

export default InputFodselsnr;
