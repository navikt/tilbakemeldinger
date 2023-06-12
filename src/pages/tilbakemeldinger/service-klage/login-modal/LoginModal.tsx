import React from 'react';
import Environment from 'Environments';
import { FormattedMessage } from 'react-intl';
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
            open={open}
            onClose={closeFunc}
        >
            <Modal.Content>
                <div className="login-modal">
                    <Heading
                        level="2"
                        id="login-modal-heading"
                        size="small"
                        className="login-modal__title"
                    >
                        <FormattedMessage id="tilbakemeldinger.serviceklage.login.overskrift" />
                    </Heading>
                    <BodyLong spacing={true} className="login-modal__info">
                        <FormattedMessage
                            id="tilbakemeldinger.serviceklage.login.beskrivelse"
                            values={{ br: () => <br /> }}
                        />
                    </BodyLong>
                    <div className="login-modal__buttons">
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
                    </div>
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default LoginModal;