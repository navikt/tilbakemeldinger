import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Link } from "react-router-dom";

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
    <LenkepanelBase
      key={props.id}
      className="linkbox__container"
      href={props.lenkeTekst}
      linkCreator={p => {
        return props.external ? (
          <a href={props.to} className={p.className}>
            {p.children}
          </a>
        ) : (
          <Link to={props.to} className={p.className}>
            {p.children}
          </Link>
        );
      }}
    >
      <div className="linkbox__rad">
        <div className="linbox__tittel">
          <Undertittel className="lenkepanel__heading">
            {props.tittel}
          </Undertittel>
        </div>
        <div className="linkbox__beskrivelse">
          <Normaltekst>{props.beskrivelse}</Normaltekst>
        </div>
        <div className="lenke">
          <Normaltekst>{props.lenkeTekst}</Normaltekst>
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default LinkBox;
