import React from "react";
import { Element, Normaltekst } from "nav-frontend-typografi";
import Icon from "components/icon/Icon";
import { HoyreChevron } from "nav-frontend-chevron";
import { Link } from "react-router-dom";

export interface Props {
  id: string;
  tittel: string;
  beskrivelse: string;
  lenkeTekst: string;
  icon?: string;
  to: string;
  component: "a" | "Link";
}

const Box = (props: Props) => {
  return (
    <>
      {props.icon && (
        <div className="linksection__icon-container icon__container">
          <Icon backgroundImage={props.icon} />
        </div>
      )}
      <div className="linksection__content">
        <div className="linksection__seksjon">
          <div className="linksection__tittel">
            <div className="lenke">
              <Element>{props.tittel}</Element>
            </div>
          </div>
          <Normaltekst>
            <span dangerouslySetInnerHTML={{ __html: props.beskrivelse }} />
          </Normaltekst>
        </div>
      </div>
      <HoyreChevron />
    </>
  );
};

const LinkSection = (props: Props) => {
  switch (props.component) {
    case "Link":
      return (
        <Link className="linksection__rad" to={props.to}>
          <Box {...props} />
        </Link>
      );
    case "a":
      return (
        <a className="linksection__rad" href={props.to}>
          <Box {...props} />
        </a>
      );
    default:
      return <Box {...props} />;
  }
};

export default LinkSection;
