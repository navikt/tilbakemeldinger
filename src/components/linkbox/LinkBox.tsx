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
          <Normaltekst>
            <Lenke href={props.to}>{props.lenkeTekst}</Lenke>
          </Normaltekst>
        ) : (
          <Normaltekst>
            <Link className={"lenke"} to={props.to}>
              {props.lenkeTekst}
            </Link>
          </Normaltekst>
        )}
      </div>
    </Box>
  );
};

export default LinkBox;
