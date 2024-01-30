import React from 'react';
import Environment from 'src/Environments';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, Button, Modal } from '@navikt/ds-react';

const { loginUrl } = Environment();

type Props = {
    open: boolean;
    closeFunc: () => void;
};

const LoginModal = ({ open, closeFunc }: Props) => {
    const currentUrl =
        typeof window !== 'undefined' ? window.location.href : '';

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
                    href={`${loginUrl}?redirect=${currentUrl}`}
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
