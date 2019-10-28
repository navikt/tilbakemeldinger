import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";
import Box from "../box/Box";
import Lenke from "nav-frontend-lenker";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse: string;
  lenkeTekst: string;
  to: string;
  external?: boolean;
  icon?: string;
}

const LinkBox = (props: Props) => {
  return (
    <Box margin={"0.25rem 0 0 0"}>
      <div className="linkbox__rad">
        <div className="linbox__tittel">
          <Undertittel className="lenkepanel__heading">
            {props.tittel}
          </Undertittel>
        </div>
        <div className="linkbox__beskrivelse">
          <Normaltekst>{props.beskrivelse}</Normaltekst>
        </div>
        {props.external ? (
          <Lenke href={props.to}>
            <Normaltekst>{props.lenkeTekst}</Normaltekst>
          </Lenke>
        ) : (
          <Link to={props.to} className="lenke">
            <Normaltekst>{props.lenkeTekst}</Normaltekst>
          </Link>
        )}
      </div>
    </Box>
  );
};

export default LinkBox;
