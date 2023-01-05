import React from "react";
import { FormattedMessage } from "react-intl";
import { Alert, Button, Link } from "@navikt/ds-react";

interface Props {
  melding?: string;
}

const Takk = (props: Props) => (
  <div className={"skjema__content"}>
    <div className="takk__alert">
      <Alert variant={"success"}>
        {props.melding ? (
          <span>{props.melding}</span>
        ) : (
          <FormattedMessage id={"takk.melding"} />
        )}
      </Alert>
    </div>
    <div className="takk__knapp">
      <Link href={"https://www.nav.no"}>
        <Button>
          <FormattedMessage id={"takk.knapp"} />
        </Button>
      </Link>
    </div>
  </div>
);

export default Takk;
