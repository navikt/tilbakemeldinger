import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../Config";

interface Props {
  to?: string;
}

const Tilbake = (props: Props) => (
  <div className="mellomrom lenke">
    <Link to={`${baseUrl}${props.to || ""}`}>Tilbake</Link>
  </div>
);

export default Tilbake;
