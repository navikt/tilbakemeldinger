import React from "react";
import Environment from "Environments";
import { FormattedMessage } from "react-intl";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";

const { loginUrl } = Environment();

type Props = {
  closeFunc: () => void;
};

const LoginModal = ({ closeFunc }: Props) => {
  return (
    <div className={"login-modal"}>
      <Undertittel className={"login-modal__title"}>
        <FormattedMessage
          id={"tilbakemeldinger.serviceklage.login.overskrift"}
        />
      </Undertittel>
      <Normaltekst className="login-modal__info">
        <FormattedMessage
          id={"tilbakemeldinger.serviceklage.login.beskrivelse"}
          values={{ br: () => <br /> }}
        />
      </Normaltekst>
      <div className="login-modal__buttons">
        <a
          className="knapp knapp--hoved knapp--kompakt"
          href={`${loginUrl}?redirect=${window.location.href}`}
        >
          <FormattedMessage id={"tilbakemeldinger.serviceklage.login.knapp"} />
        </a>
        <a
          className={"knapp knapp--flat knapp--kompakt"}
          href={window.location.href}
          onClick={(e) => {
            e.preventDefault();
            closeFunc();
          }}
        >
          <FormattedMessage
            id={"tilbakemeldinger.serviceklage.login.knapp.fortsettuten"}
          />
        </a>
      </div>
    </div>
  );
};

export default LoginModal;
