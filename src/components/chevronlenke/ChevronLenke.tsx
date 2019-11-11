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

const lenkeTekstMedChevron = (tekst: React.ReactNode, className?: string) => (
  <span className={className || ""}>
    <HoyreChevron className={"chevronlenke__chevron"} />
    {tekst}
  </span>
);

const ChevronLenke = ({ href, children, isExternal, className }: Props) => {
  const lenkeTekst = lenkeTekstMedChevron(children, className);

  return isExternal ? (
    <Lenke href={href} className="chevronlenke">
      {lenkeTekst}
    </Lenke>
  ) : (
    <Link to={href} className={"chevronlenke lenke"}>
      {lenkeTekst}
    </Link>
  );
};

export default ChevronLenke;
