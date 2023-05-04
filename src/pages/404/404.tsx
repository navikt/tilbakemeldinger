import React from "react";
import { forsidePath } from "../../Config";
import { FormattedMessage } from "react-intl";
import { Heading, Link } from "@navikt/ds-react";

const NotFound = () => (
  <>
    <div className="notfound__container">
      <Heading size={"medium"} level={"2"}>
        <FormattedMessage id={"feil.404"} />
      </Heading>
      <Link href={forsidePath}>
        <FormattedMessage id={"feil.lenke"} />
      </Link>
    </div>
  </>
);

export default NotFound;
