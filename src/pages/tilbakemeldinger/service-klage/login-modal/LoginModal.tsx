import React from 'react';
import Environment from 'Environments';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react';

const { loginUrl } = Environment();

type Props = {
    open: boolean;
    closeFunc: () => void;
};

const LoginModal = ({ open, closeFunc }: Props) => {
    return (
        <Modal
            aria-labelledby="login-modal-heading"
            header={{
                closeButton: false,
                heading: useIntl().formatMessage({
                    id: 'tilbakemeldinger.serviceklage.login.overskrift',
                }),
            }}
            open={open}
            onClose={closeFunc}
        >
            <Modal.Body>
                <BodyLong>
                    <FormattedMessage
                        id="tilbakemeldinger.serviceklage.login.beskrivelse"
                        values={{ br: () => <br /> }}
                    />
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    as="a"
                    href={`${loginUrl}?redirect=${window.location.href}`}
                >
                    <FormattedMessage id="tilbakemeldinger.serviceklage.login.knapp" />
                </Button>
                <Button
                    variant="tertiary"
                    onClick={(e) => {
                        e.preventDefault();
                        closeFunc();
                    }}
                >
                    <FormattedMessage id="tilbakemeldinger.serviceklage.login.knapp.fortsettuten" />
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
