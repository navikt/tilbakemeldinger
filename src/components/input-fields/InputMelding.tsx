import React, { ForwardedRef } from "react";
import { vars } from "../../Config";
import { Textarea, TextareaProps } from "@navikt/ds-react";

const InputMelding = React.forwardRef(
  (props: TextareaProps, ref: ForwardedRef<any>) => {
    return (
      <div>
        <Textarea
          id="InputMelding-textarea"
          maxLength={vars.maksLengdeMelding}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default InputMelding;
