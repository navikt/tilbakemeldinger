import React from "react";
import Environment from "Environments";
import { FormattedMessage } from "react-intl";
import { BodyLong, Button, Heading } from "@navikt/ds-react";

const { loginUrl } = Environment();

type Props = {
  closeFunc: () => void;
};

const LoginModal = ({ closeFunc }: Props) => {
  return (
    <div role="region" className="login-modal">
      <Heading level="2" size="small" className="login-modal__title">
        <FormattedMessage
          id={"tilbakemeldinger.serviceklage.login.overskrift"}
        />
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
          <FormattedMessage
            id="tilbakemeldinger.serviceklage.login.knapp.fortsettuten"
          />
        </Button>
      </div>
    </div>
  );
};

export default LoginModal;
