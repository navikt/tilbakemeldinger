import environment from '#client/Environments.ts';
import { FormattedMessage, useIntl } from 'react-intl';
import { BodyLong, Button, Modal } from '@navikt/ds-react';
import { withQuery } from 'ufo';

// For the <br> tags in the translation
const lineBreaks = { br: () => <br /> };

type Props = {
	open: boolean;
	closeFunc: () => void;
};

const LoginModal = ({ open, closeFunc }: Props) => {
	const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

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
					<FormattedMessage id="tilbakemeldinger.serviceklage.login.beskrivelse" values={lineBreaks} />
				</BodyLong>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" as="a" href={withQuery(environment().loginUrl, { redirect: currentUrl })}>
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
