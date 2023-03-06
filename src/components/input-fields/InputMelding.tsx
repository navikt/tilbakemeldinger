import React, { ForwardedRef } from "react";
import { vars } from "Config";
import { Textarea, TextareaProps } from "@navikt/ds-react";

const InputMelding = (props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
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
};

export default React.forwardRef(InputMelding);
