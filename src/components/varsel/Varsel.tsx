import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, AlertProps } from '@navikt/ds-react';

type Props = {
    type: AlertProps['variant'];
    tekstId?: string;
    children?: JSX.Element;
};

export const Varsel = ({ type, tekstId, children }: Props) => (
    <Alert variant={type} className={'varsel-panel'}>
        {tekstId && <FormattedMessage id={tekstId} />}
        {children}
    </Alert>
);
