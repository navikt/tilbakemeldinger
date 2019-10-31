import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { VenstreChevron } from "nav-frontend-chevron";

interface Props {
  to: string;
}

const Tilbake = (props: Props) => (
  <div className={"tilbake__lenke-container"}>
    <Link className={"tilbake__lenke lenke"} to={props.to}>
      <VenstreChevron />
      <span>
        <FormattedMessage id={"felter.tilbake"} />
      </span>
    </Link>
  </div>
);

export default Tilbake;
