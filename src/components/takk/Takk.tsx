import React from "react";
import { AlertStripeSuksess } from "nav-frontend-alertstriper";
import { Knapp } from "nav-frontend-knapper";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";

interface Props {
  melding?: string;
}
const Takk = (props: Props) => (
  <>
    <div className="takk__alert">
      <AlertStripeSuksess>
        {props.melding ? (
          <span>{props.melding}</span>
        ) : (
          <FormattedMessage id={"takk.melding"} />
        )}
      </AlertStripeSuksess>
    </div>
    <div className="takk__knapp">
      <Lenke href={"https://www.nav.no"}>
        <Knapp>
          <FormattedMessage id={"takk.knapp"} />
        </Knapp>
      </Lenke>
    </div>
  </>
);

export default Takk;
