import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, AlertProps } from '@navikt/ds-react';
import style from './Varsel.module.scss';

type Props = {
    type: AlertProps['variant'];
    tekstId?: string;
    children?: JSX.Element;
};

const role = {
    success: 'status',
    warning: 'status',
    info: undefined,
    error: 'alert'
};

export const Varsel = ({ type, tekstId, children }: Props) => (
    <Alert role={role[type]} variant={type} className={style.varsel}>
        {tekstId && <FormattedMessage id={tekstId} />}
        {children}
    </Alert>
);
