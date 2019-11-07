import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";
import Lenkepanel from "nav-frontend-lenkepanel";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse?: string;
  lenkeTekst: string;
  to: string;
  external?: boolean;
  icon?: string;
}

const TilpassetLenkepanel = (props: Props) => {
  return (
    <Lenkepanel
      href={props.to}
      border={true}
      className="linkbox__container"
      title={props.tittel}
      tittelProps={"undertittel"}
      linkCreator={p => {
        return props.external ? (
          <a href={props.to} {...p}>
            {p.children}
          </a>
        ) : (
          <Link to={props.to} {...p}>
            {p.children}
          </Link>
        );
      }}
    >
      <div className={"linkbox__row"}>
        {props.icon && (
          <div className="linkbox__icon-container">
            <img
              className="linkbox__icon"
              src={props.icon}
              alt={props.tittel}
            />
          </div>
        )}
        <div>
          <div className="linkbox__tittel">
            <Undertittel>{props.tittel}</Undertittel>
          </div>
          {props.beskrivelse && (
            <div className="linkbox__beskrivelse">
              <Normaltekst>{props.beskrivelse}</Normaltekst>
            </div>
          )}
        </div>
      </div>
    </Lenkepanel>
  );
};

export default TilpassetLenkepanel;
