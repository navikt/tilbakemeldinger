import React, { ForwardedRef } from 'react';
import { vars } from 'Config';
import { Textarea, TextareaProps } from '@navikt/ds-react';

const InputMelding = (
    props: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
) => {
    return (
        <Textarea
            id="InputMelding-textarea"
            maxLength={vars.maksLengdeMelding}
            ref={ref}
            {...props}
            autoComplete="off"
        />
    );
};

export default React.forwardRef(InputMelding);
