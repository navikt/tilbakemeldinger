import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, AlertProps } from '@navikt/ds-react';
import style from './Varsel.module.scss';

type Props = {
    type: AlertProps['variant'];
    tekstId?: string;
    children?: JSX.Element;
};

export const Varsel = ({ type, tekstId, children }: Props) => (
    <Alert variant={type} className={style.varsel}>
        {tekstId && <FormattedMessage id={tekstId} />}
        {children}
    </Alert>
);
