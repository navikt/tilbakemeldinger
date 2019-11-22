import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

type Props = {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
  className?: string;
};

const lenkeTekstMedChevron = (tekst: React.ReactNode) => (
  <span>
    <HoyreChevron className={"chevronlenke__chevron"} />
    {tekst}
  </span>
);

const RouterLenkeMedChevron = ({ href, children, isExternal, className }: Props) => {
  const lenkeTekst = lenkeTekstMedChevron(children);

  return isExternal ? (
    <Lenke href={href} className={`chevronlenke ${className}`}>
      {lenkeTekst}
    </Lenke>
  ) : (
    <Link to={href} className={`chevronlenke ${className} lenke`}>
      {lenkeTekst}
    </Link>
  );
};

export default RouterLenkeMedChevron;
