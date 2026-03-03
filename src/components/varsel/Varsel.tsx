import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, AlertProps } from '@navikt/ds-react';
import type { ReactNode } from 'react';

type Props = {
    type: AlertProps['variant'];
    tekstId?: string;
    children?: ReactNode;
};

const role = {
    success: 'status' as const,
    warning: 'status' as const,
    info: undefined,
    error: 'alert' as const,
};

export const Varsel = ({ type, tekstId, children }: Props) => (
    <Alert role={role[type]} variant={type}>
        {tekstId && <FormattedMessage id={tekstId} />}
        {children}
    </Alert>
);
