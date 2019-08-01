import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../App";

interface Props {
  to?: string;
}

const Tilbake = (props: Props) => (
  <div className="ros-til-nav__felt lenke">
    <Link to={`${baseUrl}${props.to || ""}`}>Tilbake</Link>
  </div>
);

export default Tilbake;
