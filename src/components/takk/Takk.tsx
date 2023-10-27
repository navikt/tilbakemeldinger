import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Button, Link } from '@navikt/ds-react';
import Environment from '../../Environments';

interface Props {
    melding?: string;
}

const Takk = (props: Props) => (
    <>
        <Alert variant={'success'}>
            {props.melding ? (
                <span>{props.melding}</span>
            ) : (
                <FormattedMessage id={'takk.melding'} />
            )}
        </Alert>
        <Button variant="secondary" as={Link} href={Environment().baseUrl}>
            <FormattedMessage id={'takk.knapp'} />
        </Button>
    </>
);

export default Takk;
