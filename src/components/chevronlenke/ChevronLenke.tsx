import React from "react";
import { Link } from "react-router-dom";
import Lenke from "nav-frontend-lenker";
import { HoyreChevron } from "nav-frontend-chevron";

type Props = {
  href: string,
  children: React.ReactNode,
  isExternal?: boolean,
  className?: string,
};

const cssPrefix = "chevronlenke";

const lenkeTekstMedChevron = (tekst: React.ReactNode) => (
  <>
    <HoyreChevron className={`${cssPrefix}__chevron`}/>
    {tekst}
  </>
);

const ChevronLenke = ({href, children, isExternal, className}: Props) => {
  const lenkeTekst = lenkeTekstMedChevron(children);

  return(
    <div className={className || ""}>
      {
        isExternal
        ? <Lenke href={href} className={cssPrefix}>{lenkeTekst}</Lenke>
        : <Link to={href} className={`${cssPrefix} lenke`}>{lenkeTekst}</Link>
      }
    </div>
  );
};

export default ChevronLenke;
